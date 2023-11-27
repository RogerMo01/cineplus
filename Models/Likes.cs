namespace CineplusDB.Models;

public class Likes
{
    public int ClientId { get; set; }
    public int MovieId { get; set; }
    public Client Client { get; set; }
    public Movie Movie { get; set; }
}