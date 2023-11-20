using cineplus.CRDController;

namespace cineplus.CriterionController;

[Route("api/criterion")]
[ApiController]
public class CriterionController : CRDController<Criterion> 
{
    private readonly DataContext _context;
    public CriterionController(DataContext context) : base(context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCriteria()
    {
        var criteriaDto = await base.GetAll()
            .Select(criterion => new CriterionDto
            {
                id = criterion.CriterionId,
                name = criterion.Name,
            }).ToListAsync();

        return Ok(criteriaDto);
    }

    [HttpPost]
    public async Task<IActionResult> InsertCriterion([FromBody] CriterionDto criterion)
    {
        if(_context.Criteria.Any(c => c.Name == criterion.name))
        {
            return Conflict( new { Message = "Este criterio ya existe"});
        }

        var new_criterion = new Criterion { Name = criterion.name};

        await base.Insert(new_criterion); 

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCriterion(int id)
    {
        await base.Delete(id);
        return Ok();
    }
}
