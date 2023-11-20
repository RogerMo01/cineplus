namespace CineplusDB.Models;

public class ActiveCriterion
{
    public int ActiveCriterionId { get; set; }
    public int CriterionId { get; set; }
    public virtual Criterion Criterion { get; set; }
}