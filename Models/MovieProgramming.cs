using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineplusDB.Models;

public class MovieProgramming
{
    public Guid Identifier { get; set; }

    [Key]
    public int RoomId { get; set; }
    [Key]
    public int MovieId { get; set; }
    [Key]
    public DateTime DateTimeId { get; set; }

    public decimal Price { get; set; }
    public int PricePoints { get; set; }
    
    public virtual Room Room { get; set; }
    public virtual Movie Movie { get; set; }
}