namespace cineplus.ShoppingHistoryController;

[Route("api/shoppinghistory")]
[ApiController]
public class ShoppingHistoryController : Controller
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly UtilityClass _utility;
    public ShoppingHistoryController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
        _utility = new UtilityClass(_context);
    }

    [HttpGet]
    public async Task<IActionResult> GetShoppingHistory()
    {
        (string, string) Jwt_data = _utility.GetDataJWT(HttpContext.Request);
        int userId = int.Parse(Jwt_data.Item1);

        DateTime now = DateTime.Now.AddHours(2);

        var history = _context.OnlineSales.Where(x => x.ClientId == userId && x.DateTimeId > now);
        List<CustomerPurchases> result = new List<CustomerPurchases>();

        _mapper.Map(history, result);

        foreach (var item in result)
        {
            string title = _context.Movies.FirstOrDefault(x => x.MovieId == int.Parse(item.movie)).Title;
            item.movie = title;
            string room = _context.Rooms.FirstOrDefault(x => x.RoomId == int.Parse(item.room)).Name;
            item.room = room;
            string code = _context.Seats.FirstOrDefault(x => x.SeatId == int.Parse(item.seat)).Code;
            item.seat = code;
        }

        return Ok(result);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> CancelPurchase(string id)
    {
        Guid guidIdentifer = new Guid(id);
        var item = _context.OnlineSales.FirstOrDefault(x => x.SaleIdentifier == guidIdentifer);

        DateTime now = DateTime.Now;
        TimeSpan difference = item.DateTimeId - now;
        if( difference.TotalHours < 2) { return Conflict(new { Message = "No es posible cancelar la compra con menos de dos horas de antelación" });}
        _context.OnlineSales.Remove(item);

        var ticket = _context.Tickets.FirstOrDefault(x => x.MovieId == item.MovieId && x.RoomId == item.RoomId && x.DateTimeId == item.DateTimeId && x.SeatId == item.SeatId);
        _context.Tickets.Remove(ticket);

        await _context.SaveChangesAsync();

        return Ok();
    }
    
}