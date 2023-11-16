using cineplus.CRDController;

namespace cineplus.ActorController;

public class ActorDto
{
    public int id { get; set;}
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
    public async Task<IActionResult> InsertActor([FromBody] Actor actor)
    {
        if(_context.Actors.Any(a => a.Name == actor.Name))
        {
            return Conflict( new { Message = "Este actor ya existe"});
        }

        await base.Insert(actor); 
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActor(int id)
    {
        await base.Delete(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActor(int id, [FromBody] Actor updateActor)
    {
        var actor = _context.Actors.FirstOrDefault(a => a.ActorId == id);
        if(actor == null) { return NotFound(); }

        actor.Name = updateActor.Name;

        await _context.SaveChangesAsync();
        return Ok();
    }

}