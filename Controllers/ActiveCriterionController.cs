using cineplus.CRDController;
namespace cineplus.ActiveCriterionController;

[Route("api/activecriterion")]
[ApiController]
public class ActiveCriterionController : CRDController<ActiveCriterion>
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public ActiveCriterionController(DataContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetActiveCriteria()
    {
        var active_criteria = await base.GetAll()
            .ProjectTo<CriterionDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return Ok(active_criteria);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ActivateOrDeactivateCriterion(int id)
    {
        if(_context.ActiveCriteria.Any(ac => ac.CriterionId == id))
        {
            var active_criterion = _context.ActiveCriteria.FirstOrDefault(ac => ac.CriterionId == id);
            int active_criterionId = active_criterion!.ActiveCriterionId;
            await base.Delete(active_criterionId);
            _context.SaveChanges();
            return Ok();
        }

        var new_activeCriterion = new ActiveCriterion { CriterionId = id};
        await base.Insert(new_activeCriterion);
        
        _context.SaveChanges();

        return Ok();
    }
}