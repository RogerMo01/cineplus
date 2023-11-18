namespace CineplusDB.Models
{
    public class Manager
    {
        public int ManagerId { get; set; }
        
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}

