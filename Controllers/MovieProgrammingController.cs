namespace cineplus.MovieProgrammingController;

public class ProgrammingData
{
    public int Id { get; set; }
    public string Movie { get; set; }
    public string Room { get; set; }
    public DateTime Date { get; set; }
    public decimal Price { get; set; }
    public int Points { get; set; }
}

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

        var programming = await _context.ScheduledMovies
        .Where(p => p.DateTimeId > time)
        .Select(p => new ProgrammingData
        {
            Id = p.Identifier,
            Movie =  _context.Movies.FirstOrDefault(m => m.MovieId == p.MovieId).Title,
            Room =  _context.Rooms.FirstOrDefault(r => r.RoomId == p.RoomId).Name,
            Date = p.DateTimeId,
            Price = Math.Round(p.Price, 4),
            Points = p.PricePoints
        }).ToListAsync();
        
        return Ok(programming);
        
    }

    
    [HttpPost]
    public async Task<IActionResult> InsertProgramming([FromBody] ProgrammingData data)
    {   
        // Sala a proyectar la pelicula
        var room = _context.Rooms.FirstOrDefault(r => r.Name == data.Room);

        DateTime new_Date = new DateTime(data.Date.Year, data.Date.Month, data.Date.Day, data.Date.Hour, data.Date.Minute, 0);
        bool sameDate = false;
        foreach(var item in _context.ScheduledMovies)
        {
            DateTime itemDate = item.DateTimeId;
            DateTime new_itemDate = new DateTime(itemDate.Year, itemDate.Month, itemDate.Day, itemDate.Hour, itemDate.Minute, 0);
            sameDate = (new_Date == new_itemDate);
            if(sameDate) {break; }
        }

        if(sameDate && _context.ScheduledMovies.Any(sm => sm.RoomId == room.RoomId))
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
                || (item.DateTimeId.TimeOfDay > data.Date.TimeOfDay && item.DateTimeId.TimeOfDay < next_time);
            if(overlap) { return Conflict(new { Message = "No es posible programar la pelicula en ese horario"});}
        }

        if (!_context.Schedules.Any(dt => dt.DateTime == new_Date))
        {   
            var schedule = new Schedule{ DateTime = new_Date};
            _context.Schedules.Add(schedule);
        }

        var new_movieProgramming = new MovieProgramming{
         
            RoomId = room.RoomId,
            MovieId = movie_toSchedule.MovieId,
            DateTimeId = new_Date,
            Price = data.Price, 
            PricePoints = data.Points
        };
       
        _context.ScheduledMovies.Add(new_movieProgramming);
        await _context.SaveChangesAsync();

        return Ok();
    }

    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProgramming(int id)
    {
        var toDelete = _context.ScheduledMovies.FirstOrDefault(p => p.Identifier == id);
        if(toDelete == null) {return NotFound(); }

        _context.ScheduledMovies.Remove(toDelete);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProgramming(int id, [FromBody] ProgrammingData data)
    {
        var programming = await _context.ScheduledMovies.FindAsync(id);
        if(programming == null){ return NotFound(); }

        var movie = _context.Movies.FirstOrDefault(m => m.Title == data.Movie);
        var room = _context.Rooms.FirstOrDefault(r => r.Name == data.Room);

        programming.RoomId = room.RoomId;
        programming.MovieId = movie.MovieId;
        programming.DateTimeId = data.Date;
        programming.Price = data.Price;
        programming.PricePoints = data.Points;

        await _context.SaveChangesAsync();
        return Ok();
    }

}