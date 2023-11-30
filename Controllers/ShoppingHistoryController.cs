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
        _utility = new UtilityClass();
    }

    [HttpGet]
    public async Task<IActionResult> GetShoppingHistory()
    {
        (string, string) Jwt_data = _utility.GetDataJWT(HttpContext.Request);
        int userId = int.Parse(Jwt_data.Item1);
        int clientId = _context.Clients.FirstOrDefault(x => x.UserId == userId)!.ClientId;

        DateTime now = DateTime.Now.AddHours(2);

        var history = _context.OnlineSales
            .Where(x => x.ClientId == clientId && x.DateTimeId > now)
            .Include(t => t.Ticket)
                .ThenInclude(mp => mp.MovieProgramming)
                    .ThenInclude(m => m.Movie)
            .Include(t => t.Ticket)
                .ThenInclude(mp => mp.MovieProgramming)
                    .ThenInclude(r => r.Room)
            .ToList();

        List<CustomerPurchases> result = _mapper.Map<List<CustomerPurchases>>(history);

        return Ok(result);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> CancelPurchase(string id)
    {
        Guid guidIdentifer = new Guid(id);
        var item = _context.OnlineSales.FirstOrDefault(x => x.SaleIdentifier == guidIdentifer);

        DateTime now = DateTime.Now;
        TimeSpan difference = item.DateTimeId - now;

        if (difference.TotalHours < 2) { return Conflict(new { Message = "No es posible cancelar la compra con menos de dos horas de antelación" }); }
        
        if(!item.Transfer)
        {
            int pricePoints = item.Ticket.MovieProgramming.PricePoints;
            var member = _context.Memberships.FirstOrDefault(x => x.ClientId == item.ClientId);
            member.Points += pricePoints;
        }
        _context.OnlineSales.Remove(item);

        var ticket = _context.Tickets.FirstOrDefault(x => x.MovieId == item.MovieId && x.RoomId == item.RoomId && x.DateTimeId == item.DateTimeId && x.SeatId == item.SeatId);
        _context.Tickets.Remove(ticket);

        await _context.SaveChangesAsync();

        return Ok();
    }

}