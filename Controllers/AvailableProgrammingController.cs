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
            .Where(p => p.DateTimeId > time && !p.IsDeleted)
            .ProjectTo<ProgrammingData>(_mapper.ConfigurationProvider)
            .ToListAsync();
        
        foreach (var item in programming)
        {
            Room room = _context.Rooms.FirstOrDefault(r => r.Name == item.RoomName)!;

            int ocupated_seat = _context.Tickets
            .Include(t => t.MovieProgramming)
            .Count(t => (t.MovieProgramming.MovieId == item.MovieId) && (t.MovieProgramming.RoomId == room.RoomId) && (t.MovieProgramming.DateTimeId == item.Date));

            if(ocupated_seat < room.SeatsCount) 
            { 
                availableProgramming.Add(item); 
            }
        }

        return Ok(availableProgramming);
    }
}

    
