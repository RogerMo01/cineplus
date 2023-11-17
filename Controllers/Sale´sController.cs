
using Microsoft.AspNetCore.Authorization;
using Renci.SshNet.Messages;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace cineplus.SalesControler;
public class Ticket_Without_Selection
{
    public string Pelicula{get;set;}
    public int butacas{get;set;}
    public string Sala {get;set;}
    public DateTime Horario{get;set;}
    public int cuantas{get;set;}
    public string? Discount{get;set;}

}
[Route("api/sales")]
[ApiController]
public class SalesController:Controller
{
    private readonly DataContext _context;
    public SalesController(DataContext context)
    {
        _context=context;
    }

    [Authorize(Roles ="client")]
    [HttpPost("buy")]
    public async Task<IActionResult> Buy_without_selection(Ticket_Without_Selection input)
    {
        string token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        if (input == null)
        {
            return BadRequest("Invalid Data");
        }
        //Pelicula programada que recibo de entrada
        MovieProgramming movie=_context.ScheduledMovies.Include(pp=>pp.Movie)
                                                 .Include(pp=>pp.Room)
                                                 .FirstOrDefault(pp=>(pp.Movie.Title==input.Pelicula)&&(pp.Room.Name==input.Sala))!;
        
        if (_context.Rooms.Any(c=> c.Name == input.Sala))
        {
            //Verificar si tienen capacidad las salas
            var sala = _context.Rooms.FirstOrDefault(c=>c.Name==input.Sala);
            int butaca_ocupada= _context.Tickets.Include(t=>t.MovieProg)
                                                .Count(t=>(t.MovieProg.MovieId==movie.MovieId)&&(t.MovieProg.RoomId==movie.RoomId));
            if (butaca_ocupada==sala.SeatsCount)
            {
                return Conflict(new{Message = "Sala llena"});
            }
            if (sala.SeatsCount-butaca_ocupada<input.cuantas)
            {
                return Conflict(new{Message="Debe pedir menos cantidad"});
            }
            //falta incluir la tarjeta
            Discount discount= _context.Discounts.Where(d=>d.Concept==input.Discount).FirstOrDefault();
            string client_id= Obtain_ID(token);
            int id=int.Parse(client_id);
            decimal precio=movie.Price;
            var ocupada=_context.Tickets.Where(t=>t.MovieProg==movie).Select(t=>t.Seat.SeatId).ToList();
            var disponible= _context.Seats.Where(b=>!ocupada.Contains(b.SeatId)).ToList();
            //añade los ticket a la base de datos

            for (int i = 0; i < input.cuantas; i++)
            {
                Ticket reserve=new Ticket();
                reserve.DateTimeId=movie.DateTimeId;
                reserve.MovieId=movie.MovieId;
                reserve.RoomId=movie.RoomId;
                reserve.SeatId=disponible.First().SeatId;
                reserve.Price=movie.Price;
                reserve.PricePoints=movie.PricePoints;

                BuyTicket ticket_client= new BuyTicket();
                ticket_client.ClientId=id;
                ticket_client.DateTimeId=reserve.DateTimeId;
                ticket_client.MovieId=reserve.MovieId;
                ticket_client.RoomId=reserve.RoomId;
                ticket_client.SeatId=reserve.SeatId;
                ticket_client.DiscountId=discount.DiscountId;
                ticket_client.Import=reserve.Price-(discount.Percent)*reserve.Price;
                ticket_client.OnlineBuy=true;

                _context.Tickets.Add(reserve);
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
        List<string> title=_context.ScheduledMovies.Select(t=> t.Movie.Title).Distinct().ToList();
        List<string> room=_context.ScheduledMovies.Select(s=>s.Room.Name).Distinct().ToList();
        List<string> date=_context.ScheduledMovies.Select(d=>d.DateTimeId.ToString()).ToList(); 
        List<List<string>> combinada = new List<List<string>> {title,room,date};
        return combinada;
    }
    public static string Obtain_ID(string token)
    {
        var jwt_tokenHandler= new JwtSecurityTokenHandler();
        try
        {
            var jwtToken=jwt_tokenHandler.ReadJwtToken(token);
            var id_claim=jwtToken.Claims.FirstOrDefault(c=>c.Type=="id");
            if (id_claim.Value != null)
            {
                return id_claim.Value;
            }
        }
        catch (System.Exception)
        {
            
            throw;
        }
        return null;
    }
}