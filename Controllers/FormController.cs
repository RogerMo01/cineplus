using BCryptNet = BCrypt.Net.BCrypt;
namespace cineplus.FormController;

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
    public async Task<IActionResult> Save_Client([FromBody] Client input)
    {
        // Exclude Idc makes it auto-incremental
        var newClient = new Client
        {
            Nick = input.Nick,
            Password = input.Password,
            DNI = input.DNI,
            CreditCard = input.CreditCard
        };


        // para ver mientras se debuguea, en esta variable deben estar todos los clientes de la BD
        // var clientes = _context.Clients.ToList(); // Consulta todos los clientes


        // Eliminar el cliente con Idc=3
        // var clienteABorrar = _context.Clients.FirstOrDefault(c => c.Idc == 3);
        // if (clienteABorrar != null)
        // {
        //     // Borra el cliente
        //     _context.Clients.Remove(clienteABorrar);
        //     // Guarda los cambios en la base de datos
        //     _context.SaveChanges();
        // }


        if (input == null)
        {
            return BadRequest("Invalid Data");
        }
        if (_context.Clients.Any(c => c.Nick == newClient.Nick))
        {
            return Conflict(new { Message = "El nombre de usuario ya está en uso" });
        }
        string salt = BCryptNet.GenerateSalt();
        string hashed_pass = BCryptNet.HashPassword(newClient.Password, salt);
        newClient.Password = hashed_pass;
        _context.Clients.Add(newClient);
        await _context.SaveChangesAsync();
        return Content("Valid Response.");
    }
}