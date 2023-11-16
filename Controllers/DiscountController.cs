using cineplus.CRDController;

namespace cineplus.DiscountController;

[Route("api/discount")]
[ApiController]
public class DiscountController : CRDController<Discount> 
{
    private readonly DataContext _context;

    public DiscountController(DataContext context) : base(context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetDiscounts()
    {
        var discounts = await base.GetAll()
            .Select(d => new DiscountDto
            {
                id = d.DiscountId, 
                concept = d.Concept,
                percent = d.Percent

            }).ToListAsync();
        
        return Ok(discounts);
    }

    [HttpPost]
    public async Task<IActionResult> InsertDiscount([FromBody] DiscountDto discount)
    {
        if(_context.Discounts.Any(d => d.Concept == discount.concept))
        {
            return Conflict( new { Message = "Este concepto ya existe"});
        }

        var new_discount = new Discount { Concept = discount.concept, Percent = discount.percent};
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
        if(discount == null){ return NotFound(); }

        discount.Concept = updateDiscount.concept;
        discount.Percent = updateDiscount.percent;

        await _context.SaveChangesAsync();
        return Ok();
    }

}