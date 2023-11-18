namespace CineplusDB.Models;

public class Seat
{
    public Seat()
    {
        Tickets = new List<Ticket>();
    }

    public int SeatId { get; set; }
    public int RoomId { get; set; }
    public virtual Room Room { get; set; }
    public string Code { get; set; }
    public ICollection<Ticket> Tickets { get; set; }
}