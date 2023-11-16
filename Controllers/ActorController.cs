using cineplus.CRDController;

namespace cineplus.ActorController;

public class ActorDto
{
    public int id { get; set;} = 0;
    public string name { get; set; }

}


[Route("api/actor")]
[ApiController]
public class ActorController : CRDController<Actor> 
{
    private readonly DataContext _context;

    public ActorController(DataContext context) : base(context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetActors()
    {
        var actors = await base.GetAll()
            .Select(actor => new ActorDto
            {
                id = actor.ActorId,
                name = actor.Name
            }).ToListAsync();
        
        return Ok(actors);
    }

    [HttpPost]
    public async Task<IActionResult> InsertActor([FromBody] ActorDto actor)
    {
        if(_context.Actors.Any(a => a.Name == actor.name))
        {
            return Conflict( new { Message = "Este actor ya existe"});
        }

        var new_actor = new Actor { Name = actor.name};
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

        actor.Name = updateActor.name;

        await _context.SaveChangesAsync();
        return Ok();
    }

}