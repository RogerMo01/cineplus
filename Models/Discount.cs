namespace CineplusDB.Models;

public class Discount
{
    public int DiscountId { get; set; }
    public string Concept { get; set; }
    public float Percent { get; set; }
}

public class DiscountDto
{
    public int id { get; set; } = 0;
    public string concept { get; set; }
    public float percent { get; set; }
}

