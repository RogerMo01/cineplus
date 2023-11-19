namespace cineplus.GetSeat;

public class GetSeat
{
    private readonly DataContext _context;
    public GetSeat(DataContext context)
    {
        _context = context;
    }

    [HttpGet("id")]
    public IEnumerable<Seat> GetSeats(string id)
    {
        Guid IdG = new Guid(id);
        MovieProgramming movie = _context.ScheduledMovies.FirstOrDefault(m => m.Identifier == IdG)!;
        var ocupada = _context.Tickets.Where(t => (t.RoomId == movie.RoomId) && (t.MovieId == movie.MovieId))
        .Select(t => t.Seat.SeatId).ToList();
        var disponible = _context.Seats.Where(b => (!ocupada.Contains(b.SeatId)) && (b.RoomId == movie.RoomId)).ToList();
        return disponible;
    }

}