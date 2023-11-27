using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;

namespace cineplus.MemberController;


[Route("api/associate")]
[ApiController]
public class AssociateMemberController : Controller
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly UtilityClass _utility;
    public AssociateMemberController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
        _utility = new UtilityClass();
    }

    [HttpGet]
    [Route("ismember")]
    public async Task<IActionResult> IsMember()
    {
        (string, string) Jwt_data = _utility.GetDataJWT(HttpContext.Request);
        int userId = int.Parse(Jwt_data.Item1);
        int clientId = _context.Clients.FirstOrDefault(x => x.UserId == userId)!.ClientId;

        bool member = false; 
        if(_context.Memberships.Any(x => x.ClientId == clientId)) { return Ok(new { member = !member}); }

        return Ok(new { member = member });

    }

    //[Authorize]
    [HttpPost]
    public async Task<IActionResult> Associate([FromBody] MembershipInput input)
    {
        if (_context.Memberships.Any(x => x.MemberDNI == input.DNI))
        {
            return Conflict(new { Message = "Documento de identidad asociado a una membresía existente." });
        }

        Membership member = _mapper.Map<Membership>(input);

        string data = input.DNI + input.fullName;
        int saltLength = 15;
        string code = GenerateHash(data, saltLength);

        while (_context.Memberships.Any(x => x.MembershipCode == code))
        {
            saltLength++;
            code = GenerateHash(data, saltLength);
        }

        member.MembershipCode = code;

        // string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        // var jwtSecurityToken = new JwtSecurityToken(token);
        // string role = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
        // string id = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        (string, string) Jwt_data = _utility.GetDataJWT(HttpContext.Request);

        if (Jwt_data.Item2 == "seller")
        {
            var IsRegisteredId = _context.Clients.FirstOrDefault(x => x.DNI == input.DNI);
            if (IsRegisteredId != null) { member.ClientId = IsRegisteredId.ClientId; }

            _context.Memberships.Add(member);
            _context.SaveChanges();
        }
        else if (Jwt_data.Item2 == "client")
        {
            int userId = int.Parse(Jwt_data.Item1);
            int clientId = _context.Clients.FirstOrDefault(x => x.UserId == userId)!.ClientId;

            member.ClientId = clientId;

            _context.Memberships.Add(member);
        }
        else { throw new Exception("Role not found"); }

        _context.SaveChanges();

        return Ok(new { code = code });

    }

    private string GenerateHash(string data, int saltLength)
    {
        byte[] salt;

        // Genera el salt aleatorio
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            salt = new byte[saltLength];
            rng.GetBytes(salt);
        }

        // Combina la data con el salt
        byte[] dataWithSalt = CombineBytes(Encoding.UTF8.GetBytes(data), salt);

        // Calcula el hash
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(dataWithSalt);
            // Resto del código...
            string hexHash = BitConverter.ToString(hashedBytes).Replace("-", "");

            // Ajusta la longitud de la cadena al valor deseado
            return hexHash.Substring(0, Math.Min(8, hexHash.Length));
        }
    }

    private byte[] CombineBytes(byte[] first, byte[] second)
    {
        byte[] combined = new byte[first.Length + second.Length];
        Buffer.BlockCopy(first, 0, combined, 0, first.Length);
        Buffer.BlockCopy(second, 0, combined, first.Length, second.Length);
        return combined;
    }


    [HttpGet("{dni}")]
    [Route("dni")]
    public async Task<IActionResult> GetMembership(string dni)
    {
        var member = _context.Memberships.FirstOrDefault(x => x.MemberDNI == dni);

        if (member == null) { return Conflict(new { Message = "No hay miembro asociado con ese documento de identidad" }); }

        return Ok(new { code = member.MembershipCode, name = member.FullName, points = member.Points });
    }

}