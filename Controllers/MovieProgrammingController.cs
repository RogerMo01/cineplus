using cineplus.CRDController;

namespace cineplus.MovieProgrammingController;

public class ProgrammingData
{
    public int Id { get; set; }
    public string Movie { get; set; }
    public string Room { get; set; }
    public string Date { get; set; }
    public decimal Price { get; set; }
    public int Points { get; set; }
}

[Route("api/movieprogramming")]
[ApiController]
public class MovieProgrammingController : CRDController<MovieProgramming>
{
    private readonly DataContext _context;
    public MovieProgrammingController(DataContext context) : base(context)
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

        var programming = await base.GetAll()
        .Select(p => new ProgrammingData
        {
            Id = p.Identifier,
            Movie =  _context.Movies.FirstOrDefault(m => m.MovieId == p.MovieId).Title,
            Room =  _context.Rooms.FirstOrDefault(r => r.RoomId == p.RoomId).Name,
            Date = p.DateTimeId.ToString("yyyy/MM/dd HH:mm:ss"),
            Price = Math.Round(p.Price, 4),
            Points = p.PricePoints
        }).ToListAsync();
        
        return Ok(programming);
        
    }

    
    [HttpPost]
    public async Task<IActionResult> InsertProgramming([FromBody] ProgrammingData data)
    {   
        DateTime date_time = DateTime.Parse(data.Date);
        // Sala a proyectar la pelicula
        var room = _context.Rooms.FirstOrDefault(r => r.Name == data.Room);

        if(_context.ScheduledMovies.Any(sm => sm.DateTimeId == date_time && sm.RoomId == room.RoomId))
        {
            return Conflict(new { Message = "Ya existe una pelicula programada con esa sala y horario"});
        }

        // Pelicula a programar
        var movie_toSchedule = _context.Movies.FirstOrDefault(m => m.Title == data.Movie);

        // Hora valida para que comience la proxima pelicula segun la pelicula que queremos programar 
        var next_time = date_time.TimeOfDay + new TimeSpan(0, movie_toSchedule.Duration, 0) + new TimeSpan(0, 30, 0);

        // Obtener todas las películas programadas para esa sala y fecha
        var scheduleMovies = _context.ScheduledMovies
            .Where(sm => sm.RoomId == room.RoomId && sm.DateTimeId.Date == date_time.Date)
            .ToList();

        foreach (var item in scheduleMovies)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.MovieId == item.MovieId);
            // Hora valida para que comience la proxima pelicula dada la pelicula ya programada
            var next_validateTime = item.DateTimeId.TimeOfDay + new TimeSpan(0, movie.Duration, 0) + new TimeSpan(0, 30, 0);

            bool overlap = (date_time.TimeOfDay > item.DateTimeId.TimeOfDay && date_time.TimeOfDay < next_validateTime) 
                || (item.DateTimeId.TimeOfDay > date_time.TimeOfDay && item.DateTimeId.TimeOfDay < next_time);
            if(overlap) { return Conflict(new { Message = "No es posible programar la pelicula en ese horario"});}

        }

        if (!_context.Schedules.Any(dt => dt.DateTime == date_time))
        {   
            var schedule = new Schedule{ DateTime = date_time};
            _context.Schedules.Add(schedule);
        }

        var new_movieProgramming = new MovieProgramming{
         
            RoomId = room.RoomId,
            MovieId = movie_toSchedule.MovieId,
            DateTimeId = date_time,
            Price = data.Price, 
            PricePoints = data.Points
        };
       
        await base.Insert(new_movieProgramming);
        return Ok();
    }

    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProgramming(int id)
    {
        return await base.Delete(id);
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
        programming.DateTimeId = DateTime.Parse(data.Date);
        programming.Price = data.Price;
        programming.PricePoints = data.Points;

        await _context.SaveChangesAsync();
        return Ok();
    }

}