namespace CineplusDB.Models;

public class Criterion
{
    public int CriterionId { get; set; }
    public string Name { get; set; }
    public virtual ActiveCriterion ActiveCriterion { get; set; }
}

public class CriterionDto
{
    public int id { get; set; } = 0;
    public string name { get; set; }
}