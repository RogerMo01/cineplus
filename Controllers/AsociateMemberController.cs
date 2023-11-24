using Microsoft.AspNetCore.Authorization;
using Renci.SshNet.Messages;
using System.Security.Claims;

namespace cineplus.MemberController;


[Route("api/asociate")]
[ApiController]
public class AsociateMemberController : Controller
{
    private readonly DataContext _context;
    public AsociateMemberController(DataContext context)
    {
        _context = context;
    }

    //[Authorize]
    [HttpPost]
    public async Task<IActionResult> Asociate([FromBody] MembershipData input)
    {
        //var identity = HttpContext.User.Identity as ClaimsIdentity;
        //string id = ObtainJWT.GetDataJWT(identity).Item1;
        //string role = ObtainJWT.GetDataJWT(identity).Item2;
        /*if (role == "client")
        {
            Membership member = new Membership();
            member.FullName = input.FullName;
            member.MemberDNI = input.MemberDNI;
            member.Points = input.Points;
            //member.ClientID = int.Parse(id);
            _context.Add(member);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Usted ahora es nuestro socio" });
        }*/
        //else
        //{
        Membership member = new Membership();
        member.FullName = input.FullName;
        member.MemberDNI = input.MemberDNI;
        member.Points = input.Points;
        _context.Add(member);
        await _context.SaveChangesAsync();
        return Ok(new { Message = "Su codigo es " + member.MembershipCode });
        //}
    }
}