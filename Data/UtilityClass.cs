namespace cineplus.Data.UtilityClass;

using System.Security.Claims;
using System.Security.Cryptography;

public class UtilityClass
{
    private readonly DataContext _context;
    public UtilityClass(DataContext context) { _context = context; }


    //----------------- Obtener Token desde la solicitud http -------------------------------
    public (string, string) GetDataJWT(HttpRequest request)
    {
        var identity = request.HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            string id = userClaims.FirstOrDefault(n => n.Type == ClaimTypes.NameIdentifier)!.Value;
            string role = userClaims.FirstOrDefault(n => n.Type == ClaimTypes.Role)!.Value;
            var turn_up = (id, role);
            return turn_up;
        }
        return (null, null);
    }

    // -------------- Obtener peliculas mas vendidas -----------------------------
    public List<Movie> GetMostPopularMovies()
    {
        var popular_movies = from item in _context.Tickets
                             group item by item.MovieId into group_movie
                             orderby group_movie.Count() descending
                             select group_movie.Key;

        List<int> ids = popular_movies.ToList();

        var getMovies = (from item in _context.Movies
                         where ids.Contains(item.MovieId)
                         select item)
                        .Include(p => p.ActorsByFilms)
                            .ThenInclude(a => a.Actor)
                        .Include(p => p.GenresByFilms)
                            .ThenInclude(g => g.Genre)
                        .ToList();

        return getMovies;
    }

    //------------------------Obtener Peliculas dado un filtro----------------------------------

    public class FromInput
    {
        public DateTime? begin { get; set; }
        public DateTime? end { get; set; }
        public string actor { get; set; }
        public string genres { get; set; }

    }

    public List<Movie> GetMovieByFilter(string actor, string genre, DateTime? begin, DateTime? end, bool actor_bool, bool genres_bool, bool date_bool)
    {
        FromInput input = new FromInput()
        {
            actor = actor,
            genres = genre,
            begin = begin,
            end = end
        };


        var actors = _context.ActorsByFilms
        .Include(ab => ab.Actor)
        .Where(a => a.Actor.Name == input.actor)
        .Select(a => a.MovieId)
        .ToList();

        var genres = _context.GenresByFilms
        .Include(gb => gb.Genre)
        .Where(a => a.Genre.Name == input.genres)
        .Select(g => g.MovieId)
        .ToList();

        //---------------------------Las tres------------------------------

        if (actor_bool && genres_bool && date_bool)
        {
            var movies = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Include(mp => mp.MovieProgramming.Movie)
            .Where(m => actors.Contains(m.MovieProgramming.Movie.MovieId) &&
                        genres.Contains(m.MovieProgramming.Movie.MovieId) &&
                        m.DateTimeId >= input.begin && m.DateTimeId <= input.end)
            .GroupBy(t => t.MovieId)
            .Select(g => new
            {
                movieId = g.Key,
                count = g.Count()
            })
            .OrderByDescending(x => x.count)
            .Select(x => x.movieId)
            .Take(10)
            .ToList();

            List<ActorByFilm> actor_movie = _context.ActorsByFilms
            .Include(abm => abm.Actor)
            .Where(abm => movies.Contains(abm.MovieId))
            .ToList();

            List<GenreByFilm> genre_movie = _context.GenresByFilms
            .Include(gbm => gbm.Genre)
            .Where(gbm => movies.Contains(gbm.MovieId))
            .ToList();

            List<Movie> statistic = _context.Movies.Where(m => movies.Contains(m.MovieId)).ToList();
            return statistic;
        }

        //---------------------------------------Actor y fecha---------------------------------------------

        else if (actor_bool && date_bool)
        {
            var movies = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Include(mp => mp.MovieProgramming.Movie)
            .Where(m => actors.Contains(m.MovieProgramming.Movie.MovieId) &&
                        m.DateTimeId >= input.begin && m.DateTimeId <= input.end)
            .GroupBy(t => t.MovieId)
            .Select(g => new
            {
                movieId = g.Key,
                count = g.Count()
            })
            .OrderByDescending(x => x.count)
            .Select(x => x.movieId)
            .Take(10)
            .ToList();

            List<ActorByFilm> actor_movie = _context.ActorsByFilms
            .Include(abm => abm.Actor)
            .Where(abm => movies.Contains(abm.MovieId))
            .ToList();

            List<GenreByFilm> genre_movie = _context.GenresByFilms
            .Include(gbm => gbm.Genre)
            .Where(gbm => movies.Contains(gbm.MovieId))
            .ToList();

            List<Movie> statistic = _context.Movies.Where(m => movies.Contains(m.MovieId)).ToList();

            return statistic;
        }

        //-----------------------------------Actor y genero---------------------------------------------

        else if (actor_bool && genres_bool)
        {
            var movies = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Include(mp => mp.MovieProgramming.Movie)
            .Where(m => actors.Contains(m.MovieProgramming.Movie.MovieId) &&
                        genres.Contains(m.MovieProgramming.Movie.MovieId))
            .GroupBy(t => t.MovieId)
            .Select(g => new
            {
                movieId = g.Key,
                count = g.Count()
            })
            .OrderByDescending(x => x.count)
            .Select(x => x.movieId)
            .Take(10)
            .ToList();

            List<ActorByFilm> actor_movie = _context.ActorsByFilms
            .Include(abm => abm.Actor)
            .Where(abm => movies.Contains(abm.MovieId))
            .ToList();

            List<GenreByFilm> genre_movie = _context.GenresByFilms
            .Include(gbm => gbm.Genre)
            .Where(gbm => movies.Contains(gbm.MovieId))
            .ToList();

            List<Movie> statistic = _context.Movies.Where(m => movies.Contains(m.MovieId)).ToList();
            return statistic;
        }

        //--------------------------Genero y fecha----------------------------------------------

        else if (genres_bool && date_bool)
        {
            var movies = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Include(mp => mp.MovieProgramming.Movie)
            .Where(m => genres.Contains(m.MovieProgramming.Movie.MovieId) &&
                        m.DateTimeId >= input.begin && m.DateTimeId <= input.end)
            .GroupBy(t => t.MovieId)
            .Select(g => new
            {
                movieId = g.Key,
                count = g.Count()
            })
            .OrderByDescending(x => x.count)
            .Select(x => x.movieId)
            .Take(10)
            .ToList();

            List<ActorByFilm> actor_movie = _context.ActorsByFilms
            .Include(abm => abm.Actor)
            .Where(abm => movies.Contains(abm.MovieId))
            .ToList();

            List<GenreByFilm> genre_movie = _context.GenresByFilms
            .Include(gbm => gbm.Genre)
            .Where(gbm => movies.Contains(gbm.MovieId))
            .ToList();

            List<Movie> statistic = _context.Movies.Where(m => movies.Contains(m.MovieId)).ToList();
            return statistic;
        }
        //-----------------------------Solo Actor-----------------------------------------------
        else if (actor_bool)
        {
            var movies = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Include(mp => mp.MovieProgramming.Movie)
            .Where(m => actors.Contains(m.MovieProgramming.Movie.MovieId))
            .GroupBy(t => t.MovieId)
            .Select(g => new
            {
                movieId = g.Key,
                count = g.Count()
            })
            .OrderByDescending(x => x.count)
            .Select(x => x.movieId)
            .Take(10)
            .ToList();

            List<ActorByFilm> actor_movie = _context.ActorsByFilms
            .Include(abm => abm.Actor)
            .Where(abm => movies.Contains(abm.MovieId))
            .ToList();

            List<GenreByFilm> genre_movie = _context.GenresByFilms
            .Include(gbm => gbm.Genre)
            .Where(gbm => movies.Contains(gbm.MovieId))
            .ToList();

            List<Movie> statistic = _context.Movies
            .Where(m => movies.Contains(m.MovieId))
            .ToList();
            return statistic;
        }

        //----------------------------Solo genero-----------------------------

        else if (genres_bool)
        {
            var movies = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Include(mp => mp.MovieProgramming.Movie)
            .Where(m => genres.Contains(m.MovieProgramming.Movie.MovieId))
            .GroupBy(t => t.MovieId)
            .Select(g => new
            {
                movieId = g.Key,
                count = g.Count()
            })
            .OrderByDescending(x => x.count)
            .Select(x => x.movieId)
            .Take(10)
            .ToList();

            List<ActorByFilm> actor_movie = _context.ActorsByFilms
            .Include(abm => abm.Actor)
            .Where(abm => movies.Contains(abm.MovieId))
            .ToList();

            List<GenreByFilm> genre_movie = _context.GenresByFilms
            .Include(gbm => gbm.Genre)
            .Where(gbm => movies.Contains(gbm.MovieId))
            .ToList();

            List<Movie> statistic = _context.Movies.Where(m => movies.Contains(m.MovieId)).ToList();
            return statistic;
        }
        //---------------------Solo fecha -----------------------------------------
        else
        {
            var movies = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Include(mp => mp.MovieProgramming.Movie)
            .Where(m => m.DateTimeId >= input.begin && m.DateTimeId <= input.end)
            .GroupBy(t => t.MovieId)
            .Select(g => new
            {
                movieId = g.Key,
                count = g.Count()
            })
            .OrderByDescending(x => x.count)
            .Select(x => x.movieId)
            .Take(10)
            .ToList();

            List<ActorByFilm> actor_movie = _context.ActorsByFilms
            .Include(abm => abm.Actor)
            .Where(abm => movies.Contains(abm.MovieId))
            .ToList();

            List<GenreByFilm> genre_movie = _context.GenresByFilms
            .Include(gbm => gbm.Genre)
            .Where(gbm => movies.Contains(gbm.MovieId))
            .ToList();

            List<Movie> statistic = _context.Movies.Where(m => movies.Contains(m.MovieId)).ToList();
            return statistic;
        }

    }

}


