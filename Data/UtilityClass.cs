using System.Security.Claims;

public class UtilityClass
{
    private readonly DataContext _context;

    public UtilityClass(DataContext context)
    {
        _context = context;
    }

   
        //----------------- Obtener Token desde la solicitud http -------------------------------
    public (string, string) GetDataJWT(HttpRequest request)
    {
        var identity = request.HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            string id = userClaims.FirstOrDefault(n => n.Type == ClaimTypes.NameIdentifier)?.Value;
            string role = userClaims.FirstOrDefault(n => n.Type == ClaimTypes.Role)?.Value;
            var turn_up = (id, role);
            return turn_up;
        }
        return (null, null);
    }

        // ----------  Obtener datos del ticket de la compra del cliente ----------------------
        public List<CustomerPurchases> GetPurchaseTicketData(List<CustomerPurchases> purchase)
        {
            foreach (var item in purchase)
            {
                string title = _context.Movies.FirstOrDefault(x => x.MovieId == int.Parse(item.movie)).Title;
                item.movie = title;
                string room = _context.Rooms.FirstOrDefault(x => x.RoomId == int.Parse(item.room)).Name;
                item.room = room;
                string code = _context.Seats.FirstOrDefault(x => x.SeatId == int.Parse(item.seat)).Code;
                item.seat = code;
            }

            return purchase;
        }
}


