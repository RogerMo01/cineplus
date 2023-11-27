using System.Security.Claims;
using System.Security.Cryptography;

public class UtilityClass
{
    public UtilityClass() { }


        //----------------- Obtener Token desde la solicitud http -------------------------------
    public (string, string) GetDataJWT(HttpRequest request)
    {
        var identity = request.HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            string id = userClaims.FirstOrDefault(n => n.Type == ClaimTypes.NameIdentifier)!.Value;
            string role = userClaims.FirstOrDefault(n => n.Type == ClaimTypes.Role)!.Value;
            var turn_up = (id, role);
            return turn_up;
        }
        return (null, null);
    }

    // ------------------ Generar codigo de membresia -------------------------

        public string GenerateShortHash(string data, int length)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(data));
                
                // Convierte el resultado a una cadena hexadecimal
                string hexHash = BitConverter.ToString(hashedBytes).Replace("-", "");

                // Ajusta la longitud de la cadena al valor deseado
                return hexHash.Substring(0, Math.Min(length, hexHash.Length));
            }
        }


}

