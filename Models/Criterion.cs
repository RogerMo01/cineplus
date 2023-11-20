namespace CineplusDB.Models;

public class Criterion
{
    public int CriterionId { get; set; }
    public string Name { get; set; }
    public virtual ActiveCriterion ActiveCriterion { get; set; }
}