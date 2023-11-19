
using Microsoft.AspNetCore.Authorization;
using Renci.SshNet.Messages;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace cineplus.SalesControler;

[Route("api/sales")]
[ApiController]
public class SalesController : Controller
{
    private readonly DataContext _context;
    public SalesController(DataContext context)
    {
        _context = context;
    }

    //[Authorize(Roles ="client")]
    [HttpPost("buy")]
    public async Task<IActionResult> Buy_without_selection([FromBody] Ticket_Without_Selection input)
    {
        //string token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        if (input == null)
        {
            return BadRequest("Invalid Data");
        }

        //Pelicula programada que recibo de entrada
        Guid guid = new Guid(input.MovieProgId);
        MovieProgramming movie = _context.ScheduledMovies.FirstOrDefault(mp => mp.Identifier == guid)!;

        //Verificar si tienen capacidad las salas
        var room = _context.Rooms.FirstOrDefault(r => r.RoomId == movie.RoomId);

        int ocupated_seat = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Count(t => (t.MovieProgramming.MovieId == movie.MovieId) && (t.MovieProgramming.RoomId == movie.RoomId));

        if (ocupated_seat == room.SeatsCount)
        {
            return Conflict(new { Message = "Sala sin capacidad" });
        }
        if (room.SeatsCount - ocupated_seat < input.Count_Ticket)
        {
            return Conflict(new { Message = "Disponibles solo " + (room.SeatsCount - ocupated_seat) });
        }
        //falta incluir la tarjeta
        var discount = _context.Discounts.Where(d => d.DiscountId == input.Discount).FirstOrDefault();

        //string client_id= Obtain_ID(token);
        //int id = int.Parse(client_id);

        var ocupated = _context.Tickets
            .Where(t => t.MovieProgramming.Identifier == movie.Identifier)
            .Select(t => t.Seat.SeatId)
            .ToList();

        var disponible = _context.Seats
            .Where(b => !ocupated.Contains(b.SeatId)).ToList();

        //añade los ticket a la base de datos

        for (int i = 0; i < input.Count_Ticket; i++)
        {
            //Añadir el ticket reservado a la tabla
            Ticket reserve = new Ticket();
            reserve.DateTimeId = movie.DateTimeId;
            reserve.MovieId = movie.MovieId;
            reserve.RoomId = movie.RoomId;
            reserve.SeatId = disponible.First().SeatId;
            reserve.Price = movie.Price;
            reserve.PricePoints = movie.PricePoints;

            //añadir la compra a la Base de Datos
            OnlineSales ticket_client = new OnlineSales();
            //ticket_client.ClientId = id;
            ticket_client.DateTimeId = reserve.DateTimeId;
            ticket_client.MovieId = reserve.MovieId;
            ticket_client.RoomId = reserve.RoomId;
            ticket_client.SeatId = reserve.SeatId;
            ticket_client.DiscountId = discount.DiscountId;
            ticket_client.FinalPrice = reserve.Price - (discount.Percent) * reserve.Price;
            ticket_client.Transfer = true;

            _context.Tickets.Add(reserve);
            disponible.RemoveAt(0);
        }
        await _context.SaveChangesAsync();
        return Ok(new { Message = "Compra realizada correctamente" });
    }

    //[Authorize(Roles = "client")]
}