namespace cineplus.SalesControler;

[Route("api/sales")]
[ApiController]
public class SalesController : Controller
{
    private readonly DataContext _context;
    private readonly UtilityClass _utility;
    private readonly IMapper _mapper; 
    public SalesController(DataContext context, IMapper mapper)
    {
        _context = context;
        _utility = new UtilityClass();
        _mapper = mapper;
    }

    //[Authorize(Roles ="client")]
    [HttpPost]
    public async Task<IActionResult> Buy_without_selection([FromBody] Ticket_Without_Selection input)
    {
        // Hora a la que se efectuó la compra
        DateTime now_date = DateTime.Now;

        (string, string) Jwt_data = _utility.GetDataJWT(HttpContext.Request);
        int user_id = int.Parse(Jwt_data.Item1);

        if (input == null) { return BadRequest("Invalid Data"); }

        //Pelicula programada que recibo de entrada
        Guid guid = new Guid(input.MovieProgId);
        MovieProgramming programming = _context.ScheduledMovies.FirstOrDefault(mp => mp.Identifier == guid)!;

        // Verificar si el asiento esta verdaderamente libre 
        if (_context.Tickets.Any(x => x.DateTimeId == programming.DateTimeId && x.RoomId == programming.RoomId && x.Code == input.SeatCode))
        {
            return Conflict(new { Message = "Lo sentimos, la butaca " + input.SeatCode +  " ya no está disponible. Seleccione una nueva butaca para realizar su compra."});
        }

        //Verificar si tienen capacidad las salas
        // var room = _context.Rooms.FirstOrDefault(r => r.RoomId == movie.RoomId);

        // int ocupated_seat = _context.Tickets
        //     .Include(t => t.MovieProgramming)
        //     .Count(t => (t.MovieProgramming.MovieId == movie.MovieId) && (t.MovieProgramming.RoomId == movie.RoomId) && (t.MovieProgramming.DateTimeId == movie.DateTimeId));

        // if (ocupated_seat == room.SeatsCount)
        // {
        //     return Conflict(new { Message = "Sala sin capacidad" });
        // }

        //falta incluir la tarjeta
        var discount = _context.Discounts.Where(d => d.DiscountId == input.Discount).FirstOrDefault();
        Seat seat_Id = _context.Seats.FirstOrDefault(s => (s.Code == input.SeatCode) && (s.RoomId == programming.RoomId))!;

        //Añadir el ticket reservado a la tabla
        Ticket reserve = new Ticket();

        _mapper.Map(programming, reserve);
        reserve.SeatId = seat_Id.SeatId;
        reserve.Code = input.SeatCode;
        
        _context.Tickets.Add(reserve);

        //añadir la compra a la Base de Datos dependiendo del rol
        if (Jwt_data.Item2 == "client")
        {
            var client = _context.Clients
            .FirstOrDefault(c => c.UserId == user_id);

            OnlineSales ticket_client = new OnlineSales
            {
                ClientId = client.ClientId,
                RoomId = reserve.RoomId,
                MovieId = reserve.MovieId,
                DateTimeId = reserve.DateTimeId,
                SeatId = reserve.SeatId,
                DiscountId = discount.DiscountId,
                DateOfPurchase = now_date,
                Transfer = true,
                FinalPrice = reserve.Price - (discount.Percent) * reserve.Price,
                SaleIdentifier = Guid.NewGuid()
            };

            _context.OnlineSales.Add(ticket_client);

        }
        else if (Jwt_data.Item2 == "seller")
        {
            var seller = _context.Sellers
            .FirstOrDefault(s => s.UserId == user_id);

            BoxOfficeSales ticket_client = new BoxOfficeSales
            {
                TicketSellerId = seller.TicketSellerId,
                DateTimeId = reserve.DateTimeId,
                MovieId = reserve.MovieId,
                RoomId = reserve.RoomId,
                SeatId = reserve.SeatId,
                DiscountId = discount.DiscountId,
                FinalPrice = reserve.Price - (discount.Percent) * reserve.Price,
                Cash = true
            };

            _context.BoxOfficeSales.Add(ticket_client);

        }
        try
        {
            await _context.SaveChangesAsync();

        }
        catch (Exception ex)
        {

            Console.WriteLine(ex);
        }

        return Ok(new { Message = "Compra realizada correctamente" });
    }
}