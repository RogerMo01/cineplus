using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineplusDB.Models;

public class Ticket
{
    [Key]
    public int RoomId { get; set; }
    [Key]
    public int MovieId { get; set; }
    [Key]
    public DateTime DateTimeId { get; set; }
    [Key]
    public int SeatId { get; set; }

    public double Price { get; set; }
    public int PricePoints { get; set; }
    public string Code { get; set; }

    public virtual MovieProgramming MovieProgramming { get; set; }
    public virtual Seat Seat { get; set; }
}
public class Ticket_Without_Selection
{
    public string MovieProgId { get; set; }
    public string SeatCode { get; set; }
    public int Discount { get; set; }
    public string? Code { get; set;}
    public bool PointsPayment { get; set; }
}