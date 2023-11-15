using cineplus.CRDController;

namespace cineplus.MovieController;
public class MovieDto 
{
    public int id { get; set; }
    public string title { get; set; }
    public int year { get; set; }
    public string country { get; set; }
    public string director { get; set; }
    public int duration { get; set; }
}

[Route("api/movie")]
[ApiController]
public class MovieController : CRDController<Movie> 
{
    private readonly DataContext _context;

    public MovieController(DataContext context) : base(context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetMovies()
    {
        var moviesDto = await base.GetAll()
            .Select(movie => new MovieDto
            {
                id = movie.MovieId,
                title = movie.Title,
                year = movie.Year,
                country = movie.Country,
                director = movie.Director,
                duration = movie.Duration
            }).ToListAsync();

        return Ok(moviesDto);
    }

    [HttpPost]
    public async Task<IActionResult> InsertMovie([FromBody] Movie movie)
    {
        if(_context.Movies.Any(m => m.Title == movie.Title))
        {
            return Conflict( new { Message = "Este título ya existe"});
        }

        await base.Insert(movie); 
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        await base.Delete(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMovie(int id, [FromBody] Movie updateMovie)
    {
        var movie = await _context.Movies.FindAsync(id);
        if(movie == null){ return NotFound(); }

        movie.Title = updateMovie.Title;
        movie.Year = updateMovie.Year;
        movie.Country = updateMovie.Country;
        movie.Director = updateMovie.Director;
        movie.Duration = updateMovie.Duration;

        await _context.SaveChangesAsync();
        return Ok();
    }
}