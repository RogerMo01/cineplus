using cineplus.CRDController;

namespace cineplus.RoomController;
public class RoomDto 
{
    public int id { get; set; }
    public string name { get; set; }
    public int seats { get; set; }
}

[Route("api/room")]
[ApiController]
public class RoomController : CRDController<Room> 
{
    private readonly DataContext _context;
    public RoomController(DataContext context) : base(context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetRooms()
    {
        var roomsDto = await base.GetAll()
            .Select(room => new RoomDto
            {
                id = room.RoomId,
                name = room.Name,
                seats = room.SeatsCount
            }).ToListAsync();

        return Ok(roomsDto);
    }

    [HttpPost]
    public async Task<IActionResult> InsertRoom([FromBody] Room room)
    {
        if(_context.Rooms.Any(r => r.Name == room.Name))
        {
            return Conflict( new { Message = "Este nombre ya existe"});
        }

        await base.Insert(room); 
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(int id)
    {
        return await base.Delete(id);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoom(int id, [FromBody] Room updateRoom)
    {
        var room = await _context.Rooms.FindAsync(id);
        if(room == null){ return NotFound(); }

        room.Name = updateRoom.Name;
        room.SeatsCount = updateRoom.SeatsCount;
    
        await _context.SaveChangesAsync();
        return Ok();
    }
}