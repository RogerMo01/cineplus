using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineplusDB.Models;

public class OnlineSales
{
    [Key]
    public int ClientId { get; set; }
    [Key]
    public int RoomId { get; set; }
    [Key]
    public int MovieId { get; set; }
    [Key]
    public DateTime DateTimeId { get; set; }
    [Key]
    public int SeatId { get; set; }
    [Key]
    public int DiscountId { get; set; }

    public DateTime DateOfPurchase { get; set; }
    public bool Transfer { get; set; }
    public double FinalPrice { get; set; }

    public virtual Client Client { get; set; }
    public virtual Ticket Ticket { get; set; }
    public virtual Discount Discount { get; set; }

}