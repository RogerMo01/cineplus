namespace cineplus.ReceiptController;

[Route("api/receipt")]
[ApiController]
public class ReceiptController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public ReceiptController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetReceipt(string id)
    {
        Guid identifier = new Guid(id);

        OnlineSales item = _context.OnlineSales
            .Where(x => x.SaleIdentifier == identifier)
            .Include(t => t.Ticket)
                .ThenInclude(mp => mp.MovieProgramming)
                    .ThenInclude(m => m.Movie)
            .Include(t => t.Ticket)
                .ThenInclude(mp => mp.MovieProgramming)
                    .ThenInclude(r => r.Room)
            .Include(t => t.Ticket)
            .FirstOrDefault() ?? new OnlineSales();

        CustomerPurchases receiptInfo = new CustomerPurchases();

        _mapper.Map(item, receiptInfo);

        return Ok(receiptInfo);
    }
}