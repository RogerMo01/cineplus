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
    public async Task<IActionResult> GetPopularMovies([FromBody] FromInput input)
    {
        bool actor_bool = input.actor != null;
        bool genres_bool = input.genres != null;
        bool date_bool = input.begin != null && input.end != null;
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
            List<Movie> statistic = _popular.GetMovieByFilter(input);
            return Ok(statistic);
        }
    }
}