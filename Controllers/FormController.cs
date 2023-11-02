using BCryptNet = BCrypt.Net.BCrypt;
namespace cineplus.FormController;

public class FormInput
{
    public string Nick { get; set; }
    public string Password {get; set; }
    public string DNI { get; set; }
    public string CreditCard { get; set; }
}

[Route("api/form")]
[ApiController]
public class FormController : ControllerBase
{
    private readonly DataContext _context;

    public FormController(DataContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Save_Client([FromBody] FormInput input)
    {
        if (input == null)
        {
            return BadRequest("Invalid Data");
        }

        if (_context.Users.Any(u => u.Nick == input.Nick))
        {
            return Conflict(new { Message = "El nombre de usuario ya está en uso" });
        }
        
        // Hashe password
        string salt = BCryptNet.GenerateSalt();
        string hashed_pass = BCryptNet.HashPassword(input.Password, salt);

        // Exclude Idc makes it auto-incremental
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
        await _context.SaveChangesAsync();

        // para ver mientras se debuguea, en esta variable deben estar todos los clientes de la BD
        // var clientes = _context.Clients.ToList(); // Consulta todos los clientes
        // var users = _context.Users.ToList();

        return Content("Valid Response.");
    }
}