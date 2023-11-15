using cineplus.CRDController;

namespace cineplus.GenderController;

public class GenderDto
{
    public int id { get; set;}
    public string name { get; set; }

}

[Route("api/gender")]
[ApiController]
public class GenderController : CRDController<Gender> 
{
    private readonly DataContext _context;

    public GenderController(DataContext context) : base(context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetGenders()
    {
        var genders = await base.GetAll()
            .Select(g => new GenderDto
            {
                id = g.GenderId,
                name = g.GenderName
            }).ToListAsync();
        
        return Ok(genders);
    }

    [HttpPost]
    public async Task<IActionResult> InsertGender([FromBody] Gender gender)
    {
        if(_context.Genders.Any(g => g.GenderName == gender.GenderName))
        {
            return Conflict( new { Message = "Este criterio ya existe"});
        }

        await base.Insert(gender); 
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGender(int id)
    {
        await base.Delete(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGender(int id, [FromBody] Gender updateGender)
    {
        var gender = _context.Genders.FirstOrDefault(g => g.GenderId == id);
        if(gender == null) { return NotFound(); }

        gender.GenderName = updateGender.GenderName;

        await _context.SaveChangesAsync();
        return Ok();
    }

}