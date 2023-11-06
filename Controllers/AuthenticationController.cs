using BCryptNet = BCrypt.Net.BCrypt;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;

namespace cineplus.AuthenticationController;

[Route("api/authentication")]
[ApiController]
public class Authentication : ControllerBase
{
    private readonly DataContext _context;
    private readonly JwtSettings jwtSettings;

    public Authentication(DataContext context, IOptions<JwtSettings> options)
    {
        this._context = context;
        this.jwtSettings = options.Value;
    }

    public class LoginModel
    {
        public string Nick { get; set; }
        public string Password { get; set; }
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel input)
    {
        // Verifica si el usuario existe en la base de datos.
        var user = _context.Users.FirstOrDefault(u => u.Nick == input.Nick);
        string role = "";
       
        if(user != null && VerifyPassword(user.Password, user.Salt, input.Password))
        {
            if (_context.Clients.Any(c => c.UserId == user.UserId)){
                
                role = "client";
            }
            else{

            }

            // Generar un token JWT
            var token = GenerateJwtToken(user, role);

            // Devolver el token en la respuesta
            return Ok(new { Token = token });
        }
        else
        {
            // Las credenciales son incorrectas, devuelve un mensaje de error.
            return BadRequest("Credenciales incorrectas");
        }
    }

    private bool VerifyPassword(string hashedPassword, string salt, string password)
    {
        string hashed_pass = BCryptNet.HashPassword(password, salt);
        if (hashedPassword == hashed_pass) return true;
        return false;
    }

    // Generar un Token de autenticacion (JWT) que incluye información sobre el usuario autenticado 
    string GenerateJwtToken(User user, string role)
    {
        // Crear una clave de seguridad basada en una cadena
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.jwtSettings.securitykey));
        // Crear credenciales de firma
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        // Definir informacion sobre el usuario autenticado
        var claims = new[]
        {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()), 
        new Claim(ClaimTypes.Role, role)
        };

        var token = new JwtSecurityToken(
            issuer: "Cineplus", // emisor del token  
            audience: "Cineplus", // destinataio del token
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2), // Define la expiración del token
            signingCredentials: credentials
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);

    }
}

