
namespace CineplusDB.Models
{
    public class Client
    {
        public int ClientId { get; set; }
        public string DNI { get; set; }
        public string CreditCard { get; set; }
        
        public int UserId { get; set; } // Propiedad para la clave foránea
        public virtual User User { get; set; }

        public override string ToString()
        {
            var txt = new StringBuilder();
            txt.AppendLine($"ID: {ClientId}");
            txt.AppendLine($"DNI: {DNI}");
            txt.AppendLine($"CreditCard: {CreditCard}");

            return txt.ToString();
        }
    }
}