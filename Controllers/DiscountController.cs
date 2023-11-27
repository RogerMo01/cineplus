using cineplus.CRDController;

namespace cineplus.DiscountController;

[Route("api/discount")]
[ApiController]
public class DiscountController : CRDController<Discount>
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public DiscountController(DataContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetDiscounts()
    {
        var discounts = await base.GetAll()
            .ProjectTo<DiscountDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return Ok(discounts);
    }

    [HttpPost]
    public async Task<IActionResult> InsertDiscount([FromBody] DiscountDto discount)
    {
        if (_context.Discounts.Any(d => d.Concept == discount.concept))
        {
            return Conflict(new { Message = "Este concepto ya existe" });
        }

        var new_discount = _mapper.Map<Discount>(discount);
        await base.Insert(new_discount);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDiscount(int id)
    {
        await base.Delete(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDiscount(int id, [FromBody] DiscountDto updateDiscount)
    {
        var discount = await _context.Discounts.FindAsync(id);
        if (discount == null) { return NotFound(); }

        _mapper.Map(updateDiscount, discount);

        await _context.SaveChangesAsync();
        return Ok();
    }

}