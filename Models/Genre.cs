namespace CineplusDB.Models;

public class Genre 
{
    public int GenreId { get; set; }
    public string Name { get; set; }
    
    public ICollection<GenreByFilm> GenresByFilms { get; set; }
}

public class GenreDto
{
    public int id { get; set;} = 0;
    public string name { get; set; }
}
