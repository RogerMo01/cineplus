using cineplus.Data.UtilityClass;
namespace cineplus.LikesController;

[Route("api/like")]
[ApiController]
public class LikesController : ControllerBase
{
    private readonly DataContext _context;
    private readonly UtilityClass _utility;
    public LikesController(DataContext context)
    {
        _context = context;
        _utility = new UtilityClass(_context);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ClientLiked(int id)
    {
        (string, string) Jwt_data = _utility.GetDataJWT(HttpContext.Request);
        int userId = int.Parse(Jwt_data.Item1);
        int clientId = _context.Clients.FirstOrDefault(x => x.UserId == userId)!.ClientId;

        bool active = _context.Likes.Any(x => (x.ClientId == clientId && x.MovieId == id));

        return Ok(active);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ActivateOrDeactivateLike(int id)
    {
        (string, string) Jwt_data = _utility.GetDataJWT(HttpContext.Request);
        int userId = int.Parse(Jwt_data.Item1);
        int clientId = _context.Clients.FirstOrDefault(x => x.UserId == userId)!.ClientId;

        var item = _context.Likes.Find(clientId, id);

        if (item == null)
        {
            Likes like = new Likes { ClientId = clientId, MovieId = id };
            _context.Likes.Add(like);
        }
        else { _context.Likes.Remove(item); }

        _context.SaveChanges();

        return Ok();
    }
}