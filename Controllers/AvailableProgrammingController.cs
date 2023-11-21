namespace cineplus.AvailableProgrammingController;

[Route("api/availableprogramming")]
[ApiController]
public class AvailableProgrammingController : ControllerBase
{
    private readonly DataContext _context;
    public AvailableProgrammingController(DataContext context) 
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAvailableProgramming()
    {
        List<ProgrammingData> availableProgramming = new List<ProgrammingData>();

        DateTime time = DateTime.Now;

        var programming = await _context.ScheduledMovies
        .Where(p => p.DateTimeId > time)
        .Select(p => new ProgrammingData
        {
            Id = p.Identifier.ToString(),
            Movie =  _context.Movies.FirstOrDefault(m => m.MovieId == p.MovieId).Title,
            Room =  _context.Rooms.FirstOrDefault(r => r.RoomId == p.RoomId).Name,
            Date = p.DateTimeId,
            Price = Math.Round(p.Price, 2),
            Points = p.PricePoints
        }).ToListAsync();

        foreach (var item in programming)
        {
            int movieId = _context.Movies.FirstOrDefault(m => m.Title == item.Movie).MovieId;
            Room room = _context.Rooms.FirstOrDefault(r => r.Name == item.Room);

            int ocupated_seat = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Count(t => (t.MovieProgramming.MovieId == movieId) && (t.MovieProgramming.RoomId == room.RoomId) && (t.MovieProgramming.DateTimeId == item.Date));

            if(ocupated_seat < room.SeatsCount) { availableProgramming.Add(item); }
        }

        return Ok(availableProgramming);
    }
}

    
