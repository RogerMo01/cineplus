namespace cineplus.AvailableProgrammingController;

[Route("api/availableprogramming")]
[ApiController]
public class AvailableProgrammingController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public AvailableProgrammingController(DataContext context, IMapper mapper) 
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAvailableProgramming()
    {
        List<ProgrammingData> availableProgramming = new List<ProgrammingData>();
        
        DateTime time = DateTime.Now;

        var programming = await _context.ScheduledMovies
            .Where(p => p.DateTimeId > time)
            .ProjectTo<ProgrammingData>(_mapper.ConfigurationProvider)
            .ToListAsync();
        
        foreach (var item in programming)
        {
            int movieId = _context.Movies.FirstOrDefault(m => m.Title == item.Movie).MovieId;
            Room room = _context.Rooms.FirstOrDefault(r => r.Name == item.Room);

            int ocupated_seat = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Count(t => (t.MovieProgramming.MovieId == movieId) && (t.MovieProgramming.RoomId == room.RoomId) && (t.MovieProgramming.DateTimeId == item.Date));

            if(ocupated_seat < room.SeatsCount) 
            { 
                item.Movie = movieId.ToString();
                availableProgramming.Add(item); 
            }
        }

        return Ok(availableProgramming);
    }
}

    
