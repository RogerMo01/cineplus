public class UtilityClass
{
    private readonly DataContext _context;

    public UtilityClass(DataContext context)
    {
        _context = context;
    }

    public List<MovieGet> MovieData(List<MovieGet> movies)
    {
        List<ActorByFilm> abf = _context.ActorsByFilms.ToList();
        List<Actor> actors = _context.Actors.ToList();
        List<GenreByFilm> gbf =  _context.GenresByFilms.ToList();
        List<Genre> genres =  _context.Genres.ToList();

        foreach (var item in movies)
        {
            List<ActorDto> actorsFilm = GetActors(item.id, abf, actors);
            List<GenreDto> genresFilm = GetGenres(item.id, gbf, genres);

            item.actors = actorsFilm;
            item.genres = genresFilm;
        }
        
        return movies;
    }

    private List<ActorDto> GetActors(int movieId, List<ActorByFilm> ActorsByFilms, List<Actor> Actors)
    {
        var actors = ActorsByFilms
            .Where(m => m.MovieId == movieId)
            .Join(
                Actors,
                m => m.ActorId,
                a => a.ActorId,
                (m, a) => new ActorDto
                {
                    id = a.ActorId,
                    name = a.Name
                }
            ).ToList();

        return actors;
    }

    private List<GenreDto> GetGenres(int movieId, List<GenreByFilm> GenresByFilms, List<Genre> Genres)
    {
        var genres = GenresByFilms
            .Where(m => m.MovieId == movieId)
            .Join(
                Genres,
                m => m.GenreId,
                g => g.GenreId,
                (m, g) => new GenreDto
                {
                    id = g.GenreId,
                    name = g.Name
                }
            ).ToList();

        return genres;
    }
}


