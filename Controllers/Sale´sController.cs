
using Microsoft.AspNetCore.Authorization;
using Renci.SshNet.Messages;

namespace cineplus.SalesControler;
public class Ticket_Without_Selection
{
    public string Pelicula{get;set;}
    public int butacas{get;set;}
    public string Sala {get;set;}
    public DateTime Horario{get;set;}
    public int cuantas{get;set;}
    public string? Descuento{get;set;}

}
[Route("api/sales")]
[ApiController]
public class SalesController:Controller
{
    private readonly SemiContext _context;
    public SalesController(SemiContext context)
    {
        _context=context;
    }

    [Authorize(Roles ="client")]
    [HttpPost("buy")]
    public async Task<IActionResult> Buy_without_selection(Ticket_Without_Selection input)
    {
        if (input == null)
        {
            return BadRequest("Invalid Data");
        }
        //Pelicula programada que recibo de entrada
        PeliculaProg movie=_context.PeliculaProgs.FirstOrDefault(m=>(m.IdM.Titulo==input.Pelicula)&&(m.IdS.Nombre==input.Sala)&&(m.Fecha.Fecha==input.Horario))!;
        
        if (_context.Salas.Any(c=> c.Nombre == input.Sala))
        {
            //Verificar si tienen capacidad las salas
            var sala = _context.Salas.FirstOrDefault(c=>c.Nombre==input.Sala);
            int butaca_ocupada= _context.Tickets.Count(b=>(b.IdP.IdM==movie.IdM)&&(b.IdP.IdS==movie.IdS)&&(b.IdP.Fecha==movie.Fecha));
            if (butaca_ocupada==sala.CantButacas)
            {
                return Conflict(new{Message = "Sala llena"});
            }
            if (sala.CantButacas-butaca_ocupada<input.cuantas)
            {
                return Conflict(new{Message="Debe pedir menos cantidad"});
            }
            //falta incluir la tarjeta
            int precio=movie.precio;
            var ocupada=_context.Tickets.Where(t=>t.IdP==movie).Select(t=>t.IdB.IdB).ToList();
            var disponible= _context.Butacas.Where(b=>!ocupada.Contains(b.IdB)).ToList();
            for (int i = 0; i < input.cuantas; i++)
            {
                Ticket comprado=new Ticket();
                comprado.IdP=movie;
                comprado.IdB=disponible.First();
                _context.Tickets.Add(comprado);
                disponible.RemoveAt(0);
            }
            await _context.SaveChangesAsync();
            return Ok(new{Message = "Compra realizada correctamente"});
        }
        else
        {
            return Conflict(new{Message="No existe sala con ese nombre"});
        }
    }

    [Authorize(Roles ="client")]
    [HttpGet("getmovie")]
    public IEnumerable<IEnumerable<string>> Get_progMovie()
    {
        List<string> titulo=_context.PeliculaProgs.Select(t=> t.IdM.Titulo).Distinct().ToList();
        List<string> sala=_context.PeliculaProgs.Select(s=>s.IdS.Nombre).Distinct().ToList();
        List<string> fecha=_context.PeliculaProgs.Select(f=>f.Fecha.Fecha.ToString("dd/MM/yyyy HH:mm")).Distinct().ToList();
        List<List<string>> combinada=new List<List<string>>{titulo,sala,fecha};

        return combinada;
    }
}