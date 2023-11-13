namespace CineplusDB.Models;

public class MovieProgramming
{
    public int RoomId { get; set; }
    public int MovieId { get; set; }
    public DateTime DateTimeId { get; set; }

    public decimal Price { get; set; }
    public int PricePoints { get; set; }
    
    public virtual Room Room { get; set; }
    public virtual Movie Movie { get; set; }
}