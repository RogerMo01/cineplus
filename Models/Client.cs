namespace CineplusDB.Models
{
    public class Client
    {
        public int ClientId { get; set; }
        public string DNI { get; set; }
        public string CreditCard { get; set; }
        
        public int UserId { get; set; } // Propiedad para la clave foránea
        public virtual User User { get; set; }

    }
}