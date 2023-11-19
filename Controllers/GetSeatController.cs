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
        var ocupated = _context.Tickets.Where(t => (t.RoomId == movie.RoomId) && (t.MovieId == movie.MovieId))
        .Select(t => t.Seat.SeatId).ToList();
        var available = _context.Seats.Where(b => (!ocupated.Contains(b.SeatId)) && (b.RoomId == movie.RoomId)).ToList();
        return available;
    }

}