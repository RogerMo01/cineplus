namespace CineplusDB.Models
{
    public class TicketSeller
    {
        public int TicketSellerId { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}