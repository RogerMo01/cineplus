using BCryptNet = BCrypt.Net.BCrypt;

namespace cineplus.RegisterClientContoller;

[Route("api/registration")]
[ApiController]
public class RegisterClient : ControllerBase
{
    private readonly DataContext _context;

    public RegisterClient(DataContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] FormInput input)
    {
        if (input == null)
        {
            return BadRequest("Invalid Data");
        }

        if (_context.Users.Any(u => u.Nick == input.Nick))
        {
            return Conflict(new { Message = "El nombre de usuario ya está en uso" });
        }

        if (_context.Clients.Any(c => c.DNI == input.DNI))
        {
            return Conflict(new { Message = "El documento de identidad ya está asociado a otra cuenta" });
        }

        // Hashe password
        string salt = BCryptNet.GenerateSalt();
        string hashed_pass = BCryptNet.HashPassword(input.Password, salt);

        var newUser = new User
        {
            Nick = input.Nick,
            Password = hashed_pass,
            Salt = salt
        };
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        var newClient = new Client
        {
            DNI = input.DNI,
            CreditCard = input.CreditCard,
            UserId = newUser.UserId
        };
        _context.Clients.Add(newClient);

        var member = _context.Memberships.FirstOrDefault(x => x.MemberDNI == input.DNI);
        if (member != null) { member.ClientId = newClient.ClientId; }

        await _context.SaveChangesAsync();

        return Content("Valid Response.");
    }
}