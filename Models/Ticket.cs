using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineplusDB.Models;

public class Ticket
{
    public Guid IdentifierTicket { get; set; }
    [Key]
    public int RoomId { get; set; }
    [Key]
    public int MovieId { get; set; }
    [Key]
    public DateTime DateTimeId { get; set; }
    [Key]
    public int SeatId { get; set; }

    public decimal Price{ get; set; }
    public int PricePoints{ get; set; }
    public int Code{ get; set; }

    public virtual MovieProgramming MovieProgramming { get; set; }
    public virtual Seat Seat { get; set; }
}