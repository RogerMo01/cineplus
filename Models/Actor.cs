using Org.BouncyCastle.Asn1.Crmf;

namespace CineplusDB.Models;

public class Actor 
{
    public int ActorId { get; set; }
    public string ActorName { get; set; }
    
    public ICollection<ActorByFilm> ActorsByFilms { get; set; }

}