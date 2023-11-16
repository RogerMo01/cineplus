namespace CineplusDB.Models;

public class Genre 
{
    public int GenreId { get; set; }
    public string Name { get; set; }
    
    public ICollection<GenreByFilm> GenresByFilms { get; set; }
}