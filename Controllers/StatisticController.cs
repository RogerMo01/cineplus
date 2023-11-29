using cineplus.Data.UtilityClass;

namespace cineplus.Controllers;
[Route("api/statistic")]
[ApiController]
public class StatisticController : Controller
{
    private readonly UtilityClass _utility;
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public StatisticController(DataContext dbContext, IMapper mapper)
    {
        _context = dbContext;
        _utility = new UtilityClass(_context);
        _mapper = mapper;

    }

    [HttpGet]
    public async Task<IActionResult> GetPopularMovies([FromQuery] string? actor, [FromQuery] string? genres, [FromQuery] DateTime? begin, [FromQuery] DateTime? end)
    {
        bool actor_bool = actor != null;
        bool genres_bool = genres != null;
        bool date_bool = begin != null && end != null;

        List<MovieGet> movies = new List<MovieGet>();

        if (!actor_bool && !genres_bool && !date_bool)
        {
            List<Movie> popular_movies = _utility.GetMostPopularMovies();

            movies = _mapper.Map<List<MovieGet>>(popular_movies);

            if (popular_movies.Count <= 10)
            {
                return Ok(movies);
            }
            else
            {
                return Ok(movies.Take(10).ToList());
            }
        }
        else
        {
            //🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 Puede explotar
            List<Movie> statistic = _utility.GetMovieByFilter(actor, genres, begin, end, actor_bool, genres_bool, date_bool);
            movies = _mapper.Map<List<MovieGet>>(statistic);

            return Ok(movies);
        }
    }

    [HttpGet]
    [Route("pie")]
    public async Task<IActionResult> CubanVsForeigner()
    {
        int count_cubanMovies = _context.Tickets
            .Include(mp => mp.MovieProgramming)
                .ThenInclude(m => m.Movie)
            .Where(ticket => ticket.MovieProgramming.Movie.Country == "Cuba")
            .Count();

        int count_internationalMovies = _context.Tickets.Count() - count_cubanMovies;

        return Ok(new { national = count_cubanMovies, international = count_internationalMovies });
    }

    [HttpGet]
    [Route("topclients")]
    public async Task<IActionResult> TopClients()
    {
        var topClients = _context.OnlineSales
            .Include(c => c.Client)
                .ThenInclude(u => u.User)
            .GroupBy(sale => sale.Client.User)
            .Select(group => new
            {
                nick = group.Key.Nick,
                TotalSales = group.Count()
            })
            .OrderByDescending(result => result.TotalSales)
            .Take(3)
            .ToList();

        return Ok(topClients);
    }

}