using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CineplusDB.Models;

namespace cineplus.FormController;

[Route("api/form")]
[ApiController]
public class FormController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public FormController(ApplicationDbContext context)
    {
        _context = context;
    }
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Save_Client([FromBody] Clients new_client)
    {
        if (new_client == null)
        {
            return BadRequest("Datos no Validos");
        }
        if (_context.Client.Any(c => c.Nick == new_client.Nick))
        {
            return BadRequest("Ya existe usuario con ese nick");
        }

        _context.Client.Add(new_client);
        await _context.SaveChangesAsync();
        return Ok(new { Message = "Cliente Registrado con éxito" });
    }
}