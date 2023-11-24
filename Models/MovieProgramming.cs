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

    public virtual Room Room { get; set; }
    public virtual Movie Movie { get; set; }
    public ICollection<Ticket> Tickets { get; set; }
}

public class ProgrammingData
{
    public string Id { get; set; } = "";
    public string Movie { get; set; }
    public string Room { get; set; }
    public DateTime Date { get; set; }
    public double Price { get; set; }
    public int Points { get; set; }
}

public class MovieProgrammingData {
    public string Id { get; set; } = "";
    public int Movie { get; set; }
    public string Room { get; set; }
    public DateTime Date { get; set; }
    public double Price { get; set; }
    public int Points { get; set; }
}