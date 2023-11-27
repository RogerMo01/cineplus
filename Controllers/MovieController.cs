using cineplus.CRDController;

namespace cineplus.MovieController;

[Route("api/movie")]
[ApiController]
public class MovieController : CRDController<Movie>
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public MovieController(DataContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetMovies()
    {
        var getMovies = _context.Movies
            .Include(p => p.ActorsByFilms)
                .ThenInclude(a => a.Actor)
            .Include(p => p.GenresByFilms)  
                .ThenInclude(g => g.Genre)
            .ToList();

        List<MovieGet> movies = _mapper.Map<List<MovieGet>>(getMovies);

        return Ok(movies);
    }


    [HttpPost]
    public async Task<IActionResult> InsertMovie([FromBody] MovieInput movieDto)
    {
        if (_context.Movies.Any(m => m.Title == movieDto.title))
        {
            return Conflict(new { Message = "Este título ya existe" });
        }

        Movie movie = _mapper.Map<Movie>(movieDto);

        await base.Insert(movie);
        await _context.SaveChangesAsync();

        return Ok();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        await base.Delete(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMovie(int id, [FromBody] MovieInput updateMovie)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null) { return NotFound(); }

        var deleteActors = await _context.ActorsByFilms
            .Where(m => m.MovieId == id)
            .ToListAsync();

        _context.ActorsByFilms.RemoveRange(deleteActors);

        var deleteGenres = await _context.GenresByFilms
            .Where(m => m.MovieId == id)
            .ToListAsync();

        _context.GenresByFilms.RemoveRange(deleteGenres);

        _mapper.Map(updateMovie, movie);

        await _context.SaveChangesAsync();

        return Ok();
    }
}

