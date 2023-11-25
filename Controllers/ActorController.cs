using cineplus.CRDController;

namespace cineplus.ActorController;

[Route("api/actor")]
[ApiController]
public class ActorController : CRDController<Actor> 
{
    private readonly DataContext _context;
    private readonly IMapper _mapper; 

    public ActorController(DataContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetActors()
    {
        var actors = await base.GetAll()
            .ProjectTo<ActorDto>(_mapper.ConfigurationProvider) 
            .ToListAsync();
        
        return Ok(actors);
    }

    [HttpPost]
    public async Task<IActionResult> InsertActor([FromBody] ActorDto actor)
    {
        if(_context.Actors.Any(a => a.Name == actor.name))
        {
            return Conflict( new { Message = "Este actor ya existe"});
        }

        Actor new_actor = _mapper.Map<Actor>(actor);
        await base.Insert(new_actor); 
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActor(int id)
    {
        await base.Delete(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActor(int id, [FromBody] ActorDto updateActor)
    {
        var actor = _context.Actors.FirstOrDefault(a => a.ActorId == id);
        if(actor == null) { return NotFound(); }

        _mapper.Map(updateActor, actor);

        await _context.SaveChangesAsync();
        return Ok();
    }

}