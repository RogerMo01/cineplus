using cineplus.CRDController;

namespace cineplus.DiscountController;

public class DiscountDto
{
    public int id { get; set; }
    public string concept { get; set; }
    public float percent { get; set; }
}

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
    public async Task<IActionResult> InsertDiscount([FromBody] Discount discount)
    {
        if(_context.Discounts.Any(d => d.Concept == discount.Concept))
        {
            return Conflict( new { Message = "Este concepto ya existe"});
        }

        await base.Insert(discount); 
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDiscount(int id)
    {
        await base.Delete(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDiscount(int id, [FromBody] Discount updateDiscount)
    {
        var discount = await _context.Discounts.FindAsync(id);
        if(discount == null){ return NotFound(); }

        discount.Concept = updateDiscount.Concept;
        discount.Percent = updateDiscount.Percent;

        await _context.SaveChangesAsync();
        return Ok();
    }

}