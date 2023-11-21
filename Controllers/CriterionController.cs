using cineplus.CRDController;
using Microsoft.AspNetCore.Mvc.Routing;
using cineplus.MovieController;

namespace cineplus.CriterionController;

[Route("api/criterion")]
[ApiController]
public class CriterionController : CRDController<Criterion> 
{
    private readonly DataContext _context;
    public CriterionController(DataContext context) : base(context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("all")]
    public async Task<IActionResult> GetCriteria()
    {
        var criteriaDto = await base.GetAll()
            .Select(criterion => new CriterionDto
            {
                id = criterion.CriterionId,
                name = criterion.Name,
            }).ToListAsync();

        return Ok(criteriaDto);
    }

    [HttpGet]
    [Route("random")]
    public async Task<IActionResult> GetRandomMovies()
    {
        var allmovies = _context.Movies.ToList();
        // var random_movies = _context.Movies.OrderBy(m => Guid.NewGuid()).ToList();
        var random_movies = allmovies.OrderBy(m => Guid.NewGuid()).ToList();

        List<MovieGet> movies = new List<MovieGet>();

        foreach (var item in random_movies)
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

}


