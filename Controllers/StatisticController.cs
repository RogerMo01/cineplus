using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace cineplus.Controllers;
[Route("api/statistic")]
[ApiController]
public class StatisticController : Controller
{
    private readonly IMostPopular _popular;
    private readonly DataContext _context;
    public StatisticController(DataContext dbContext)
    {
        _context = dbContext;
        _popular = new MostPopular(_context);
    }

    [HttpGet]
    public async Task<IActionResult> GetPopularMovies([FromQuery] string actor, [FromQuery] string genres, [FromQuery] DateTime? begin, [FromQuery] DateTime? end)
    {
        bool actor_bool = actor != null;
        bool genres_bool = genres != null;
        bool date_bool = begin != null && end != null;
        if (!actor_bool && !genres_bool && !date_bool)
        {
            List<Movie> popular_movies = _popular.GetMostPopularMovies();
            if (popular_movies.Count <= 10)
            {
                return Ok(popular_movies);
            }
            else
            {
                return Ok(popular_movies.Take(10).ToList());
            }
        }
        else
        {
            //🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 Puede explotar
            FromInput filter= new FromInput();
            filter.actor = actor;
            filter.genres = genres;
            filter.begin = begin;
            filter.end = end;

            List<Movie> statistic = _popular.GetMovieByFilter(filter);
            return Ok(statistic);
        }
    }
}