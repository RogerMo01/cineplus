namespace cineplus.MovieProgrammingController;

[Route("api/movieprogramming")]
[ApiController]
public class MovieProgrammingController : ControllerBase
{
    private readonly DataContext _context;
    public MovieProgrammingController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProgramming()
    {
        DateTime time = DateTime.Now;
        var instances_toDelete = _context.ScheduledMovies
            .Where(i => i.DateTimeId < time)
            .ToList();
        
        var dates_toDelete = _context.Schedules
            .Where(d => d.DateTime < time)
            .ToList();

        
        _context.ScheduledMovies.RemoveRange(instances_toDelete);
        _context.Schedules.RemoveRange(dates_toDelete);
        await _context.SaveChangesAsync();

        var programming = await _context.ScheduledMovies
        .Select(p => new ProgrammingData
        {
            Movie =  _context.Movies.FirstOrDefault(m => m.MovieId == p.MovieId).Title,
            Room =  _context.Rooms.FirstOrDefault(r => r.RoomId == p.RoomId).Name,
            Date = p.DateTimeId,
            Price = Math.Round(p.Price, 2),
            Points = p.PricePoints
        }).ToListAsync();
        
        return Ok(programming);
        
    }

    public class ProgrammingData
    {
        public string Movie { get; set; }
        public string Room { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public int Points { get; set; }
    }

    [HttpPost]
    public async Task<IActionResult> Save_Programming([FromBody] ProgrammingData data)
    {
        // Sala a proyectar la pelicula
        var room = _context.Rooms.FirstOrDefault(r => r.Name == data.Room);

        if(_context.ScheduledMovies.Any(sm => sm.DateTimeId == data.Date && sm.RoomId == room.RoomId))
        {
            return Conflict(new { Message = "Ya existe una pelicula programada con esa sala y horario"});
        }

        // Pelicula a programar
        var movie_toSchedule = _context.Movies.FirstOrDefault(m => m.Title == data.Movie);

        // Hora valida para que comience la proxima pelicula segun la pelicula que queremos programar 
        var next_time = data.Date.TimeOfDay + new TimeSpan(0, movie_toSchedule.Duration, 0) + new TimeSpan(0, 30, 0);

        // Obtener todas las películas programadas para esa sala y fecha
        var scheduleMovies = _context.ScheduledMovies
            .Where(sm => sm.RoomId == room.RoomId && sm.DateTimeId.Date == data.Date.Date)
            .ToList();

        foreach (var item in scheduleMovies)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.MovieId == item.MovieId);
            // Hora valida para que comience la proxima pelicula dada la pelicula ya programada
            var next_validateTime = item.DateTimeId.TimeOfDay + new TimeSpan(0, movie.Duration, 0) + new TimeSpan(0, 30, 0);

            bool overlap = (data.Date.TimeOfDay > item.DateTimeId.TimeOfDay && data.Date.TimeOfDay < next_validateTime) 
                || item.DateTimeId.TimeOfDay > data.Date.TimeOfDay && item.DateTimeId.TimeOfDay < next_time;
            if(overlap) { return Conflict(new { Message = "No es posible programar la pelicula en ese horario"});}

        }

        if (!_context.Schedules.Any(dt => dt.DateTime == data.Date))
        {   
            var schedule = new Schedule{ DateTime = data.Date};
            _context.Schedules.Add(schedule);
        }

        var new_movieProgramming = new MovieProgramming{
         
            RoomId = room.RoomId,
            MovieId = movie_toSchedule.MovieId,
            DateTimeId = data.Date,
            Price = data.Price, 
            PricePoints = data.Points
        };
       
        _context.ScheduledMovies.Add(new_movieProgramming);
        await _context.SaveChangesAsync();

        return Ok();
    }

}