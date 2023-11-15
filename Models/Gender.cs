namespace CineplusDB.Models;

public class Gender 
{
    public int GenderId { get; set; }
    public string GenderName { get; set; }
    
    public ICollection<GenderByFilm> GendersByFilms { get; set; }
}