namespace cineplus.Controllers;
public interface IMostPopular
{
    public List<Movie> GetMostPopularMovies();
    public List<Movie> GetMovieByFilter(FromInput input);
}

public class FromInput
{
    public DateTime? begin { get; set; }
    public DateTime? end { get; set; }
    public string actor { get; set; }
    public string genres { get; set; }

}
public class MostPopular : IMostPopular
{
    private readonly DataContext _context;
    public MostPopular(DataContext dbContext)
    {
        _context = dbContext;
    }
    public List<Movie> GetMostPopularMovies()
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
        var getMovies = from item in _context.Movies
                        where ids.Contains(item.MovieId)
                        select item;

        return getMovies.ToList();
    }
    public List<Movie> GetMovieByFilter(FromInput input)
    {
        bool actor_bool = input.actor != null;
        bool genres_bool = input.genres != null;
        bool date_bool = input.begin != null && input.end != null;

        ActorByFilm actor = _context.ActorsByFilms.Include(ab => ab.Actor).FirstOrDefault(a => a.Actor.Name == input.actor)!;
        GenreByFilm genre = _context.GenresByFilms.Include(gb => gb.Genre).FirstOrDefault(a => a.Genre.Name == input.genres)!;

        var movies = _context.Tickets
        .Include(t => t.MovieProgramming)
        .Include(mp => mp.MovieProgramming.Movie)
        .Where(m => (actor_bool && genres_bool && date_bool &&
        m.MovieProgramming.Movie.ActorsByFilms == actor && m.MovieProgramming.Movie.GenresByFilms == genre && m.DateTimeId >= input.begin && m.DateTimeId <= input.end)
        || (actor_bool && genres_bool && m.MovieProgramming.Movie.ActorsByFilms == actor && m.MovieProgramming.Movie.GenresByFilms == genre)
        || (genres_bool && date_bool && m.MovieProgramming.Movie.GenresByFilms == genre && m.DateTimeId >= input.begin && m.DateTimeId <= input.end)
        || (actor_bool && date_bool && m.MovieProgramming.Movie.ActorsByFilms == actor && m.DateTimeId >= input.begin && m.DateTimeId <= input.end)
        || (actor_bool && m.MovieProgramming.Movie.ActorsByFilms == actor)
        || (genres_bool && m.MovieProgramming.Movie.GenresByFilms == genre)
        || (date_bool && m.DateTimeId >= input.begin && m.DateTimeId <= input.end)
        )
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
        List<Movie> statistic = _context.Movies.Where(m => movies.Contains(m.MovieId)).ToList();
        return statistic;
    }


}