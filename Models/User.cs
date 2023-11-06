namespace CineplusDB.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Nick { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }

        public virtual Client Client { get; set; }
    }
}