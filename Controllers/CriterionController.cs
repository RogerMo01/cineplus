namespace cineplus.CriterionController;

[Route("api/criterion")]
[ApiController]
public class CriterionController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public CriterionController(DataContext context, IMapper mapper) 
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    [Route("all")]
    public async Task<IActionResult> GetCriteria()
    {
        var criteria = _context.Criteria.ToList();

        List<CriterionDto> result = new List<CriterionDto>();

        _mapper.Map(criteria, result);
        
        return Ok(result);
    }
    

    [HttpGet]
    [Route("random")]
    public async Task<IActionResult> GetRandomMovies()
    {
        var allmovies = _context.Movies.ToList();

        var random_movies = allmovies.OrderBy(m => Guid.NewGuid()).ToList();

        List<MovieGet> movies = new List<MovieGet>();

        _mapper.Map(random_movies, movies);

        UtilityClass utilityClass = new UtilityClass(_context);
        movies = utilityClass.MovieData(movies);

        if (movies.Count <= 20) { return Ok(movies); }
        else
        {
            List<MovieGet> limit_movies = movies.Take(20).ToList();
            return Ok(limit_movies);
        }
    }

    
    [HttpGet]
    [Route("recentlyadded")]
    public async Task<IActionResult> GetRecentlyAddedMovies()
    {
        var recently_added_movies = from item in _context.Movies.ToList()
                                    orderby item.MovieId descending
                                    select item;

        List<MovieGet> moviesGet = new List<MovieGet>();
        _mapper.Map(recently_added_movies, moviesGet);

        UtilityClass utilityClass = new UtilityClass(_context);
        moviesGet = utilityClass.MovieData(moviesGet);

        if (moviesGet.Count <= 20) { return Ok(moviesGet); }
        else
        {
            List<MovieGet> limit_movies = moviesGet.Take(20).ToList();
            return Ok(limit_movies);
        }
    }


    [HttpGet]
    [Route("thisyear")]
    public async Task<IActionResult> GetThisYearMovies()
    {
        DateTime date = DateTime.Now;
        var movies = _context.Movies.Where(m => m.Year == date.Year).ToList();

        List<MovieGet> this_year_movies = new List<MovieGet>();

        _mapper.Map(movies, this_year_movies);

        UtilityClass utilityClass = new UtilityClass(_context);
        this_year_movies = utilityClass.MovieData(this_year_movies);


        if (this_year_movies.Count <= 20) { return Ok(this_year_movies); }
        else
        {
            List<MovieGet> limit_movies = this_year_movies.Take(20).ToList();
            return Ok(limit_movies);
        }
    }


    [HttpGet]
    [Route("recentlyprogramming")]
    public async Task<IActionResult> GetRecentlyProgramming()
    {
        DateTime now_date = DateTime.Now.AddHours(2);
        DateTime next_date = now_date.AddDays(7);

        var movie_programmingIds = _context.ScheduledMovies
                .Where(m => m.DateTimeId >= now_date && m.DateTimeId <= next_date)
                .Select(m => m.MovieId)
                .Distinct()
                .ToList();

        var movies = _context.Movies
                      .Where(m => movie_programmingIds.Contains(m.MovieId))
                      .ToList();
        
        List<MovieGet> recently_programming = new List<MovieGet>();

        _mapper.Map(movies, recently_programming);

        UtilityClass utilityClass = new UtilityClass(_context);
        recently_programming = utilityClass.MovieData(recently_programming);

        
        if (recently_programming.Count() <= 20) { return Ok(recently_programming); }
        else
        {
            List<MovieGet> limit = recently_programming.Take(20).ToList();
            return Ok(limit);
        }
    }


    [HttpGet]
    [Route("mostpopular")]
    public async Task<IActionResult> GetMostPopularMovies()
    {
        var popular_movies = from item in _context.Tickets
                             group item by item.MovieId into group_movie
                             orderby group_movie.Count() descending
                             select group_movie.Key;
                           
        List<int> ids = popular_movies.ToList();

        List<MovieGet> result = new List<MovieGet>();

        var getMovies = from item in _context.Movies
                        where ids.Contains(item.MovieId)
                        select item;

        List<Movie> movies = getMovies.ToList();

        _mapper.Map(movies, result);

        UtilityClass utilityClass = new UtilityClass(_context);
        result = utilityClass.MovieData(result);


        if (popular_movies.Count() <= 20)
        {
            return Ok(result);
        }
        else
        {
            result = result.Take(20).ToList();
            return Ok(result);
        }
    }
}


