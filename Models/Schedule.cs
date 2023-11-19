using System.ComponentModel.DataAnnotations;

namespace CineplusDB.Models;
public class Schedule
{
    [Key]
    public DateTime DateTime { get; set; }
}