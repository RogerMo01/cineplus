using cineplus.CRDController;

namespace cineplus.GenreController;

[Route("api/genre")]
[ApiController]
public class GenreController : CRDController<Genre> 
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public GenreController(DataContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetGenres()
    {
        var genres = await base.GetAll()
            .ProjectTo<GenreDto>(_mapper.ConfigurationProvider) 
            .ToListAsync();
        
        return Ok(genres);
    }

    [HttpPost]
    public async Task<IActionResult> InsertGenre([FromBody] GenreDto genre)
    {
        if(_context.Genres.Any(g => g.Name == genre.name))
        {
            return Conflict( new { Message = "Este criterio ya existe"});
        }

        Genre new_genre = _mapper.Map<Genre>(genre);
        await base.Insert(new_genre); 
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGender(int id)
    {
        await base.Delete(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGender(int id, [FromBody] GenreDto updateGender)
    {
        var gender = _context.Genres.FirstOrDefault(g => g.GenreId == id);
        if(gender == null) { return NotFound(); }

        _mapper.Map(updateGender, gender);

        await _context.SaveChangesAsync();
        return Ok();
    }

}