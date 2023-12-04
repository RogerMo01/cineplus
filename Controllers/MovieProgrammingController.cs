namespace cineplus.MovieProgrammingController;

[Route("api/movieprogramming")]
[ApiController]
public class MovieProgrammingController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public MovieProgrammingController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetProgramming()
    {
        DateTime time = DateTime.Now;

        var programming = await _context.ScheduledMovies
            .Where(p => p.DateTimeId > time && !p.IsDeleted)
             .ProjectTo<ProgrammingData>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return Ok(programming);
    }


    [HttpPost]
    public async Task<IActionResult> InsertProgramming([FromBody] ProgrammingData data)
    {

        TimeZoneInfo cubaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Cuba Standard Time");

        // Convertir la fecha a la zona horaria de Cuba
        DateTime cubaDate = TimeZoneInfo.ConvertTimeFromUtc(data.Date, cubaTimeZone);


        // Sala a proyectar la pelicula
        var room = _context.Rooms.FirstOrDefault(r => r.Name == data.RoomName);

        DateTime new_Date = new DateTime(cubaDate.Year, cubaDate.Month, cubaDate.Day, cubaDate.Hour, cubaDate.Minute, 0);
        bool sameDate = false;
        MovieProgramming mp = new MovieProgramming();
        foreach (var item in _context.ScheduledMovies)
        {
            DateTime itemDate = item.DateTimeId;
            DateTime new_itemDate = new DateTime(itemDate.Year, itemDate.Month, itemDate.Day, itemDate.Hour, itemDate.Minute, 0);
            sameDate = ((new_Date == new_itemDate) && (item.RoomId == room.RoomId));
            if (sameDate) { mp = item; break; }
        }

        if (sameDate)
        {
            if (!mp.IsDeleted)
            {

                { return Conflict(new { Message = "Ya existe una pelicula programada con esa sala y horario" }); }
            }
        }

        // Pelicula a programar
        var movie_toSchedule = _context.Movies.FirstOrDefault(m => m.Title == data.MovieTitle && !m.IsDeleted);

        // Hora valida para que comience la proxima pelicula segun la pelicula que queremos programar 
        var next_time = cubaDate.TimeOfDay + new TimeSpan(0, movie_toSchedule.Duration, 0) + new TimeSpan(0, 30, 0);

        bool overlap = ValidateDate(cubaDate, room.RoomId, next_time);

        if (overlap) { return Conflict(new { Message = "No es posible programar la pelicula en ese horario" }); }

        if (!_context.Schedules.Any(dt => dt.DateTime == new_Date))
        {
            var schedule = new Schedule { DateTime = new_Date };
            _context.Schedules.Add(schedule);
        }

        MovieProgramming new_movieProgramming = _mapper.Map<MovieProgramming>(data);

        new_movieProgramming.Identifier = Guid.NewGuid();
        new_movieProgramming.MovieId = movie_toSchedule.MovieId;
        new_movieProgramming.RoomId = room.RoomId;
        new_movieProgramming.DateTimeId = cubaDate;

        _context.ScheduledMovies.Add(new_movieProgramming);
        await _context.SaveChangesAsync();

        return Ok();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProgramming(string id)
    {
        Guid guidIdentifer = new Guid(id);
        var toDelete = _context.ScheduledMovies.FirstOrDefault(p => p.Identifier == guidIdentifer);
        if (toDelete == null) { return NotFound(); }

        if (_context.Tickets.Any(m => m.MovieId == toDelete.MovieId && m.RoomId == toDelete.RoomId && m.DateTimeId == toDelete.DateTimeId))
        {
            toDelete.IsDeleted = true;
            await _context.SaveChangesAsync();

            return Ok();
        }

        _context.ScheduledMovies.Remove(toDelete);
        await _context.SaveChangesAsync();

        return Ok();
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProgramming(string id, [FromBody] ProgrammingData data)
    {
        Guid guidIdentifer = new Guid(id);

        var toUpdate = _context.ScheduledMovies.FirstOrDefault(p => p.Identifier == guidIdentifer);

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
            if (overlap) { return overlap; }

        }

        return false;
    }

}