
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
        string id = GetDataJWT().Item1;
        int user_id = int.Parse(id);
        string role = GetDataJWT().Item2;

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
        //falta incluir la tarjeta
        var discount = _context.Discounts.Where(d => d.DiscountId == input.Discount).FirstOrDefault();
        Seat seat_Id = _context.Seats.FirstOrDefault(s => (s.Code == input.Seat) && (s.RoomId == movie.RoomId));

        //Añadir el ticket reservado a la tabla
        Ticket reserve = new Ticket();
        reserve.DateTimeId = movie.DateTimeId;
        reserve.MovieId = movie.MovieId;
        reserve.RoomId = movie.RoomId;
        reserve.SeatId = seat_Id.SeatId;
        reserve.Price = movie.Price;
        reserve.PricePoints = movie.PricePoints;

        //añadir la compra a la Base de Datos dependiendo del rol
        //if (role == "client")
        //{
        OnlineSales ticket_client = new OnlineSales();
        //ticket_client.ClientId = user_id;
        ticket_client.DateTimeId = reserve.DateTimeId;
        ticket_client.MovieId = reserve.MovieId;
        ticket_client.RoomId = reserve.RoomId;
        ticket_client.SeatId = reserve.SeatId;
        ticket_client.DiscountId = discount.DiscountId;
        ticket_client.FinalPrice = reserve.Price - (discount.Percent) * reserve.Price;
        ticket_client.Transfer = true;
        //}
        /*else if (role == "seller")
        {
            BoxOfficeSales ticket_client = new BoxOfficeSales();
            ticket_client.TicketSellerId = user_id;
            ticket_client.DateTimeId = reserve.DateTimeId;
            ticket_client.MovieId = reserve.MovieId;
            ticket_client.RoomId = reserve.RoomId;
            ticket_client.SeatId = reserve.SeatId;
            ticket_client.DiscountId = discount.DiscountId;
            ticket_client.FinalPrice = reserve.Price - (discount.Percent) * reserve.Price;
            ticket_client.Cash = true;
        }*/


        _context.Tickets.Add(reserve);


        await _context.SaveChangesAsync();
        return Ok(new { Message = "Compra realizada correctamente" });
    }
    public (string, string) GetDataJWT()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            string id = userClaims.FirstOrDefault(n => n.Type == ClaimTypes.NameIdentifier)?.Value;
            string role = userClaims.FirstOrDefault(n => n.Type == ClaimTypes.Role)?.Value;
            var turn_up = (id, role);
            return turn_up;
        }
        return (null, null);
    }
}