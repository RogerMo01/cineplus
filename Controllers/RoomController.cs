using cineplus.CRDController;

namespace cineplus.RoomController;

[Route("api/room")]
[ApiController]
public class RoomController : CRDController<Room>
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public RoomController(DataContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetRooms()
    {
        var roomsDto = await base.GetAll()
            .ProjectTo<RoomDto>(_mapper.ConfigurationProvider) 
            .ToListAsync();

        return Ok(roomsDto);
    }


    [HttpPost]
    public async Task<IActionResult> InsertRoom([FromBody] RoomDto room)
    {
        if (_context.Rooms.Any(r => r.Name == room.name))
        {
            return Conflict(new { Message = "Este nombre ya existe" });
        }

        Room new_room = _mapper.Map<Room>(room);

        await base.Insert(new_room);

        int roomId = _context.Rooms.FirstOrDefault(r => r.Name == new_room.Name)!.RoomId;

        List<Seat> seats = generateSeats(new_room.SeatsCount, new_room.Name, roomId);
        new_room.SeatsByRoom = seats;

        _context.Seats.AddRange(seats);
        
        await _context.SaveChangesAsync();

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
        Room room = await _context.Rooms.FindAsync(id);
        if (room == null) { return NotFound(); }

        _mapper.Map(updateRoom, room);

        await deleteSeats(id);
        room.SeatsByRoom = generateSeats(updateRoom.seats, updateRoom.name, room.RoomId);

        await _context.SaveChangesAsync();

        return Ok();
    }



    // ------------------ Generate Seats ------------------------------------------
    private List<Seat> generateSeats(int n, string name, int roomId)
    {
        List<Seat> seats = new List<Seat>();
        for (int i = 1; i <= n; i++)
        {
            string prefix = generatePrefix(name);

            Seat seat = new Seat
            {
                RoomId = roomId,
                Code = prefix.ToUpper() + "-" + i
            };

            seats.Add(seat);
        }

        return seats;
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


    // ---------------------- Delete Seats ---------------------------------------------

    private async Task deleteSeats(int id)
    {
        var seats = _context.Seats.Where(s => s.RoomId == id).ToList();
        _context.Seats.RemoveRange(seats);
        await _context.SaveChangesAsync();
    }

}