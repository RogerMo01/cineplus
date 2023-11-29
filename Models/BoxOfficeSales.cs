using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper.Execution;

namespace CineplusDB.Models;

public class BoxOfficeSales
{
    [Key]
    public int TicketSellerId { get; set; }
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
    public bool Cash { get; set; }
    public double FinalPrice { get; set; }
    [ForeignKey("MemberCode")]
    public virtual Membership Membership { get; set; }
    public string? MemberCode { get; set; }
    public virtual TicketSeller TicketSeller { get; set; }
    public virtual Ticket Ticket { get; set; }
    public virtual Discount Discount { get; set; }

}
