namespace CineplusDB.Models;

public class ActorByFilm
{
    public int ActorId { get; set; }
    public Actor Actor { get; set; }
    public int MovieId { get; set; }
    public Movie Movie { get; set; }
}