using cineplus.CRDController;

namespace cineplus.MovieController;

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
        List<MovieGet> movies = new List<MovieGet>();

        var getMovies= await base.GetAll().ToListAsync();

        foreach (var item in getMovies)
        {
            List<Dto> actorsFilm = GetActors(item.MovieId);
            List<Dto> genresFilm = GetGenres(item.MovieId);


            MovieGet movie = new MovieGet{
                id = item.MovieId,
                title = item.Title,
                year = item.Year,
                country = item.Country,
                director = item.Director,
                duration = item.Duration,
                actors = actorsFilm, 
                genres = genresFilm
            };

            movies.Add(movie);
        }

        return Ok(movies);
    }

    private List<Dto> GetActors(int movieId)
    {
        var actors = _context.ActorsByFilms
            .Where(m => m.MovieId == movieId)
            .Join(
                _context.Actors,
                m => m.ActorId,
                a => a.ActorId,
                (m, a) => new Dto
                {
                    id = a.ActorId,
                    name = a.Name
                }
            ).ToList();

        return actors;
    }

    private List<Dto> GetGenres(int movieId)
    {
        var genres = _context.GenresByFilms
            .Where(m => m.MovieId == movieId)
            .Join(
                _context.Genres,
                m => m.GenreId,
                g => g.GenreId,
                (m, g) => new Dto
                {
                    id = g.GenreId,
                    name = g.Name
                }
            ).ToList();

        return genres;
    }

    [HttpPost]
    public async Task<IActionResult> InsertMovie([FromBody] MovieInput movieDto)
    {
        if(_context.Movies.Any(m => m.Title == movieDto.title))
        {
            return Conflict( new { Message = "Este título ya existe"});
        }

        Movie movie = new Movie{
            Title = movieDto.title,
            Year = movieDto.year,
            Country = movieDto.country,
            Director = movieDto.director,
            Duration = movieDto.duration
        };

        await base.Insert(movie); 

        int movieId = _context.Movies.FirstOrDefault(m => m.Title == movieDto.title).MovieId;

        foreach (var item in movieDto.actors)
        {
            ActorByFilm actorByFilm = new ActorByFilm{
                ActorId = item,
                MovieId = movieId
            };

            _context.ActorsByFilms.Add(actorByFilm);
        }

        foreach (var item in movieDto.genres)
        {
            GenreByFilm genreByFilm = new GenreByFilm{
                GenreId = item,
                MovieId = movieId
            };

            _context.GenresByFilms.Add(genreByFilm);
        }        

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
        if(movie == null){ return NotFound(); }

        movie.Title = updateMovie.title;
        movie.Year = updateMovie.year;
        movie.Country = updateMovie.country;
        movie.Director = updateMovie.director;
        movie.Duration = updateMovie.duration;

        var deleteActors = await _context.ActorsByFilms
            .Where (m => m.MovieId == id)
            .ToListAsync();
        
        _context.ActorsByFilms.RemoveRange(deleteActors);

        var deleteGenres = await _context.GenresByFilms
            .Where (m => m.MovieId == id)
            .ToListAsync();

        _context.GenresByFilms.RemoveRange(deleteGenres);

        foreach (var item in updateMovie.actors)
        {
            ActorByFilm actorByFilm = new ActorByFilm{
                ActorId = item,
                MovieId = movie.MovieId
            };

            _context.ActorsByFilms.Add(actorByFilm);
        }

        foreach (var item in updateMovie.genres)
        {
            GenreByFilm genreByFilm = new GenreByFilm{
                GenreId = item,
                MovieId = movie.MovieId
            };

            _context.GenresByFilms.Add(genreByFilm);
        }        
        await _context.SaveChangesAsync();

        return Ok();
    }
}