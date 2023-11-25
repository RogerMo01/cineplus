using System.Security.Claims;

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

        //----------------- Obtener Token desde la solicitud http -------------------------------
    public (string, string) GetDataJWT(HttpRequest request)
    {
        var identity = request.HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            string id = userClaims.FirstOrDefault(n => n.Type == ClaimTypes.NameIdentifier)?.Value;
            string role = userClaims.FirstOrDefault(n => n.Type == ClaimTypes.Role)?.Value;
            var turn_up = (id, role);
            return turn_up;
        }
        return (null, null);
    }

        // ----------  Obtener datos del ticket de la compra del cliente ----------------------
        public List<CustomerPurchases> GetPurchaseTicketData(List<CustomerPurchases> purchase)
        {
            foreach (var item in purchase)
            {
                string title = _context.Movies.FirstOrDefault(x => x.MovieId == int.Parse(item.movie)).Title;
                item.movie = title;
                string room = _context.Rooms.FirstOrDefault(x => x.RoomId == int.Parse(item.room)).Name;
                item.room = room;
                string code = _context.Seats.FirstOrDefault(x => x.SeatId == int.Parse(item.seat)).Code;
                item.seat = code;
            }

            return purchase;
        }
}


