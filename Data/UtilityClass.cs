using System.Security.Claims;

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

}

