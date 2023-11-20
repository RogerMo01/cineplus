using cineplus.CRDController;

namespace cineplus.ActiveCriterionController;

[Route("api/activecriterion")]
[ApiController]
public class ActiveCriterionController : CRDController<ActiveCriterion> 
{
    private readonly DataContext _context;
    public ActiveCriterionController(DataContext context) : base(context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetActiveCriteria()
    {
        var active_criteriaDto = await base.GetAll()
            .Select(active_criterion => new ActiveCriterionDto
            {
                id = active_criterion.CriterionId,
            }).ToListAsync();

        return Ok(active_criteriaDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ActivateOrDeactivateCriterion(int id)
    {
        if(_context.ActiveCriteria.Any(ac => ac.CriterionId == id))
        {
            await base.Delete(id);
            return Ok();
        }

        var new_activeCriterion = new ActiveCriterion { CriterionId = id};
        await base.Insert(new_activeCriterion);
        
        return Ok();
    }
}