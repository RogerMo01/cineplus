namespace CineplusDB.Models
{
    public class Client
    {
        public int Idc { get; set; }
        public string Nick { get; set; }
        public string Password { get; set; }
        public string DNI { get; set; }
        public string CreditCard { get; set; }

        public override string ToString()
        {
            var txt = new StringBuilder();
            txt.AppendLine($"ID: {Idc}");
            txt.AppendLine($"Nick: {Nick}");
            txt.AppendLine($"Password: {Password}");
            txt.AppendLine($"DNI: {DNI}");
            txt.AppendLine($"CreditCard: {CreditCard}");

            return txt.ToString();
        }
    }
}