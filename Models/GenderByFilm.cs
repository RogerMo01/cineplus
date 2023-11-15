namespace CineplusDB.Models;

public class GenderByFilm
{
    public int GenderId { get; set; }
    public Gender Gender { get; set; }
    public int MovieId { get; set; }
    public Movie Movie { get; set; }
}