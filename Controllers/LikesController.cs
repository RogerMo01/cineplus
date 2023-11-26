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
        _utility = new UtilityClass();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ActivateOrDeactivateLike(int id)
    {
        (string, string) Jwt_data = _utility.GetDataJWT(HttpContext.Request);
        int userId = int.Parse(Jwt_data.Item1);
        int clientId = _context.Clients.FirstOrDefault(x => x.UserId == userId)!.ClientId;

        var item = _context.Likes.Find(clientId, id);
        bool IsLike = false;

        if(item == null)
        {
            Likes like = new Likes { ClientId = clientId, MovieId = id};
            _context.Likes.Add(like);
            _context.SaveChanges();
            IsLike = true;
            return Ok(IsLike);
        }
        else {

            _context.Likes.Remove(item);
            _context.SaveChanges();
            return Ok(IsLike); 
        }
    }
}