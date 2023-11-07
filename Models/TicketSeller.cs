namespace CineplusDB.Models
{
    public class TicketSeller
    {
        public int SellerId { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}