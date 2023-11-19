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
        
        return Ok(programming);
    }

    
    [HttpPost]
    public async Task<IActionResult> InsertProgramming([FromBody] ProgrammingData data)
    {   

        TimeZoneInfo cubaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Cuba Standard Time");

        // Convertir la fecha a la zona horaria de Cuba
        DateTime cubaDate = TimeZoneInfo.ConvertTimeFromUtc(data.Date, cubaTimeZone);


        // Sala a proyectar la pelicula
        var room = _context.Rooms.FirstOrDefault(r => r.Name == data.Room);

        DateTime new_Date = new DateTime(cubaDate.Year, cubaDate.Month, cubaDate.Day, cubaDate.Hour, cubaDate.Minute, 0);
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
        var next_time = cubaDate.TimeOfDay + new TimeSpan(0, movie_toSchedule.Duration, 0) + new TimeSpan(0, 30, 0);

        bool overlap = ValidateDate(cubaDate, room.RoomId, next_time);
        
        if(overlap) { return Conflict(new { Message = "No es posible programar la pelicula en ese horario"});}
        
        if (!_context.Schedules.Any(dt => dt.DateTime == new_Date))
        {   
            var schedule = new Schedule{ DateTime = new_Date};
            _context.Schedules.Add(schedule);
        }

        var new_movieProgramming = new MovieProgramming{
         
            Identifier = Guid.NewGuid(),
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
    public async Task<IActionResult> DeleteProgramming(string id)
    {
        Guid guidIdentifer = new Guid(id);
        var toDelete = _context.ScheduledMovies.FirstOrDefault(p => p.Identifier == guidIdentifer);
        if(toDelete == null) {return NotFound(); }

        _context.ScheduledMovies.Remove(toDelete);
        await _context.SaveChangesAsync();

        return Ok();
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProgramming(string id, [FromBody] ProgrammingData data)
    {
        Guid guidIdentifer = new Guid(id);

        TimeZoneInfo cubaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Cuba Standard Time");

        // Convertir la fecha a la zona horaria de Cuba
        DateTime cubaDate = TimeZoneInfo.ConvertTimeFromUtc(data.Date, cubaTimeZone);

        var toUpdate = _context.ScheduledMovies.FirstOrDefault(p => p.Identifier == guidIdentifer);
        if(toUpdate == null) {return NotFound(); }

        var movie = _context.Movies.FirstOrDefault(m => m.Title == data.Movie);
        var room = _context.Rooms.FirstOrDefault(r => r.Name == data.Room);

        // Hora valida para que comience la proxima pelicula segun la pelicula que queremos programar 
        var next_time = cubaDate.TimeOfDay + new TimeSpan(0, movie.Duration, 0) + new TimeSpan(0, 30, 0);

        bool overlap = ValidateDate(cubaDate, room.RoomId, next_time);
        
        if(overlap) { return Conflict(new { Message = "No es posible editar la pelicula para ese horario"});}

        toUpdate.RoomId = room.RoomId;
        toUpdate.MovieId = movie.MovieId;
        toUpdate.DateTimeId = cubaDate;
        toUpdate.Price = data.Price;
        toUpdate.PricePoints = data.Points;

        await _context.SaveChangesAsync();
        return Ok();
    }

    private bool ValidateDate(DateTime cubaDate, int roomId, TimeSpan next_time)
    {
        var scheduleMovies = _context.ScheduledMovies
            .Where(sm => sm.RoomId == roomId && sm.DateTimeId.Date == cubaDate.Date)
            .ToList();

        foreach (var item in scheduleMovies)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.MovieId == item.MovieId);

            // Hora valida para que comience la proxima pelicula dada la pelicula ya programada
            var next_validateTime = item.DateTimeId.TimeOfDay + new TimeSpan(0, movie.Duration, 0) + new TimeSpan(0, 30, 0);

            bool overlap = (cubaDate.TimeOfDay > item.DateTimeId.TimeOfDay && cubaDate.TimeOfDay < next_validateTime) 
                || (item.DateTimeId.TimeOfDay > cubaDate.TimeOfDay && item.DateTimeId.TimeOfDay < next_time);
            if(overlap) { return overlap; }
        
        }

        return false;
    }

}