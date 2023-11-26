using cineplus.CRDController;

namespace cineplus.MovieController;

[Route("api/poster")]
[ApiController]
public class PosterController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public PosterController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> SetPoster()
    {
        try
        {
            var poster = HttpContext.Request.Form.Files["file"];
            var name = HttpContext.Request.Form["name"];

            if (poster != null && poster.Length > 0)
            {
                // Procesar la imagen, por ejemplo, guardarla en el servidor
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp", "public", "posters");

                var filePath = Path.Combine(uploadsFolder, name.ToString() + ".jpg");
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await poster.CopyToAsync(stream);
                }

                return Ok(new { Message = "Imagen cargada con éxito" });
            }
            else
            {
                return BadRequest(new { Message = "No se proporcionó un archivo" });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Error interno del servidor", Exception = ex.Message });
        }
    }


    [HttpPut]
    public async Task<IActionResult> PutPoster()
    {
        try
        {
            var poster = HttpContext.Request.Form.Files["file"];
            var name = HttpContext.Request.Form["name"].ToString();
            var old = HttpContext.Request.Form["old"].ToString();
            var id = int.Parse(HttpContext.Request.Form["id"].ToString());

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp", "public", "posters");

            if (poster != null && poster.Length > 0)
            {

                // Obtener la extensión original del archivo (si existe)
                var originalExtension = Path.GetExtension(name);

                // Construir la ruta original del archivo
                var originalFilePath = Path.Combine(uploadsFolder, name);

                // Si el archivo original existe, renombrarlo con el valor de 'name'
                if (System.IO.File.Exists(originalFilePath))
                {
                    // Renombrar el archivo con la extensión original (si la tiene)
                    var newFilePath = Path.Combine(uploadsFolder, name + originalExtension);
                    System.IO.File.Move(originalFilePath, newFilePath);
                }

                var filePath = Path.Combine(uploadsFolder, name.ToString() + ".jpg");

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await poster.CopyToAsync(stream);
                }

                return Ok(new { Message = "Imagen cargada con éxito" });
            }
            else
            {
                // Construir la ruta del archivo original
                var oldFilePath = Path.Combine(uploadsFolder, old + ".jpg");

                // Verificar si el archivo original existe
                if (System.IO.File.Exists(oldFilePath))
                {
                    // Construir la ruta del nuevo archivo
                    // var newFilePath = Path.Combine(uploadsFolder, Uri.EscapeDataString(name) + ".jpg");
                    var newFilePath = Path.Combine(uploadsFolder, name + ".jpg");

                    // Renombrar el archivo
                    System.IO.File.Move(oldFilePath, newFilePath);
                }

                return Ok(new { Message = "Imagen editada con éxito" });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Error interno del servidor", Exception = ex.Message });
        }
    }

}