namespace cineplus.ReceiptController;

[Route("api/receipt")]
[ApiController]
public class ReceiptController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly UtilityClass _utility;
    public ReceiptController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
        _utility = new UtilityClass(_context);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetReceipt(string id)
    {
        Guid identifier = new Guid(id);

        var item = _context.OnlineSales.FirstOrDefault(x => x.SaleIdentifier == identifier);

        var buy = _mapper.Map<CustomerPurchases>(item);

        List<CustomerPurchases> buys = new List<CustomerPurchases> { buy };

        buys = _utility.GetPurchaseTicketData(buys);

        return Ok(buys[0]);

    }
}