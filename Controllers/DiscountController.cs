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
            .ToListAsync();

        discounts = discounts.Where(d => !d.IsDeleted).ToList();

        List<DiscountDto> discountsDto = _mapper.Map<List<DiscountDto>>(discounts);

        return Ok(discounts);
    }

    [HttpPost]
    public async Task<IActionResult> InsertDiscount([FromBody] DiscountDto discount)
    {
        if (_context.Discounts.Any(d => d.Concept == discount.concept && !d.IsDeleted))
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
        var sale = (from item1 in _context.OnlineSales
                    join item2 in _context.BoxOfficeSales on item1.DiscountId equals item2.DiscountId
                    where item1.DiscountId == id && item2.DiscountId == id
                    select new { OnlineSales = item1, BoxOfficeSales = item2 })
                    .FirstOrDefault();

        if(sale == null)
        {
            await base.Delete(id);
        }
        else
        {
            var discount = _context.Discounts.FirstOrDefault(x => x.DiscountId == id);
            if(!discount.IsDeleted) 
            { 
                discount.IsDeleted = true;
                await _context.SaveChangesAsync();
            }
        }

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