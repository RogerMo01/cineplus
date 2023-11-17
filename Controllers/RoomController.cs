using cineplus.CRDController;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace cineplus.RoomController;

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
    public async Task<IActionResult> InsertRoom([FromBody] RoomDto room)
    {
        if(_context.Rooms.Any(r => r.Name == room.name))
        {
            return Conflict( new { Message = "Este nombre ya existe"});
        }

        var new_room = new Room { Name = room.name, SeatsCount = room.seats};
        await base.Insert(new_room); 

        int roomId = _context.Rooms.FirstOrDefault(r => r.Name == room.name).RoomId;

        await generateSeats(room.seats, room.name, roomId);
        
        return Ok();
    }
   

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(int id)
    {
        await base.Delete(id);

        await deleteSeats(id);

        return Ok();
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoom(int id, [FromBody] RoomDto updateRoom)
    {
        var room = await _context.Rooms.FindAsync(id);
        if(room == null){ return NotFound(); }

        if(room.SeatsCount != updateRoom.seats)
        {
            await deleteSeats(id);
            await generateSeats(updateRoom.seats, updateRoom.name, room.RoomId);
        }

        room.Name = updateRoom.name;
        room.SeatsCount = updateRoom.seats;
    
        await _context.SaveChangesAsync();
        return Ok();
    }
    

// ------------------ Generate Seats ------------------------------------------
     private async Task generateSeats(int n, string name, int roomId)
    {
        for(int i = 1; i <= n; i++)
        {
            string prefix = generatePrefix(name);

            Seat seat = new Seat{
                RoomId = roomId,
                Code = prefix.ToUpper() + "-" + i
            };

            _context.Seats.Add(seat);
            await _context.SaveChangesAsync();
        }
    }

    private string generatePrefix(string p)
    {
        string[] words = p.Split(' ');

        // Tomar la primera letra de cada palabra o fragmento de números consecutivos
        string initials = string.Join("", words.Select(word => GetInitial(word)));

        return initials;
    }
    private static string GetInitial(string word)
    {
        // Si la palabra es numérica, devolver la palabra completa
        if (IsNumerical(word))
        {
            return word;
        }

        // Tomar la primera letra de la palabra
        return word[0].ToString();
    }
    private static bool IsNumerical(string str)
    {
        return int.TryParse(str, out _);
    }
//  ------------------------------------------------------------------------

// ---------------------- Delete Seats ---------------------------------------------

    private async Task deleteSeats(int id)
    {
        var seats = _context.Seats.Where(s => s.RoomId == id).ToList();
        _context.Seats.RemoveRange(seats);
        await _context.SaveChangesAsync();
    }

// -------------------------------------------------------------------------------
}