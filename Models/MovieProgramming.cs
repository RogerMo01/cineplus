using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineplusDB.Models;

public class MovieProgramming
{
    public MovieProgramming()
    {
        Tickets = new List<Ticket>();
    }

    public Guid Identifier { get; set; }

    [Key]
    public int RoomId { get; set; }
    [Key]
    public int MovieId { get; set; }
    [Key]
    public DateTime DateTimeId { get; set; }

    public double Price { get; set; }
    public int PricePoints { get; set; }
    public bool IsDeleted { get; set; } = false;

    public virtual Room Room { get; set; }
    public virtual Movie Movie { get; set; }
    public ICollection<Ticket> Tickets { get; set; }
}

public class ProgrammingData
{
    public string Id { get; set; } = "";
    public int MovieId { get; set; }
    public string MovieTitle { get; set; }
    public string RoomName { get; set; }
    public DateTime Date { get; set; }
    public double Price { get; set; }
    public int Points { get; set; }
}
