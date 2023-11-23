using cineplus.CRDController;
using Microsoft.AspNetCore.Mvc.Routing;
using cineplus.MovieController;
using System.Data.Entity.Core.Common.CommandTrees;

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
        var random_movies = allmovies.OrderBy(m => Guid.NewGuid()).ToList();

        List<MovieGet> movies = CreateMovieGet(random_movies);

        if (movies.Count <= 20) { return Ok(movies); }
        else
        {
            List<MovieGet> limit_movies = movies.Take(20).ToList();
            return Ok(limit_movies);
        }
    }

    private List<MovieGet> CreateMovieGet(List<Movie> movies)
    {
        List<MovieGet> result = new List<MovieGet>();

        foreach (var item in movies)
        {
            List<Dto> actorsFilm = GetActors(item.MovieId);
            List<Dto> genresFilm = GetGenres(item.MovieId);

            MovieGet movie = new MovieGet
            {
                id = item.MovieId,
                title = item.Title,
                year = item.Year,
                country = item.Country,
                director = item.Director,
                duration = item.Duration,
                actors = actorsFilm,
                genres = genresFilm
            };

            result.Add(movie);
        }

        return result;
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


    [HttpGet]
    [Route("recentlyadded")]
    public async Task<IActionResult> GetRecentlyAddedMovies()
    {
        var recently_added_movies = from item in _context.Movies.ToList()
                                    orderby item.MovieId descending
                                    select item;

        List<Movie> movies = recently_added_movies.ToList();

        List<MovieGet> moviesGet = CreateMovieGet(movies);

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

        List<MovieGet> this_year_movies = CreateMovieGet(movies);

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
        
        List<MovieGet> recently_programming = CreateMovieGet(movies);

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
                             select new Dto
                             {
                                 id = group_movie.Key
                             };

        List<int> ids = new List<int>();
        foreach (var item in popular_movies)
        {
            ids.Add(item.id);
        }

        List<MovieGet> result = new List<MovieGet>();

        var getMovies = from item in _context.Movies
                        where ids.Contains(item.MovieId)
                        select item;

        List<Movie> movies = getMovies.ToList();

        if (popular_movies.Count() <= 20)
        {
            result = CreateMovieGet(movies);
            return Ok(result);
        }
        else
        {
            result = CreateMovieGet(movies).Take(20).ToList();
            return Ok(result);
        }
    }
}


