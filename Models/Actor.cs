using Org.BouncyCastle.Asn1.Crmf;

namespace CineplusDB.Models;

public class Actor 
{
    public Actor()
    {
        ActorsByFilms = new List<ActorByFilm>();
    }

    public int ActorId { get; set; }
    public string Name { get; set; }
    
    public ICollection<ActorByFilm> ActorsByFilms { get; set; }

}

public class ActorDto
{
    public int id { get; set;} = 0;
    public string name { get; set; }

}