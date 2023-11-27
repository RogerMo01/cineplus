using System.ComponentModel.DataAnnotations;

namespace CineplusDB.Models;

public class Membership
{
    [Key]
    public string MembershipCode { get; set; }
    public string MemberDNI { get; set; }
    public int Points { get; set; }
    public string FullName { get; set; }
    public int? ClientId { get; set; }

    public virtual Client Client { get; set; }
}
public class MembershipData
{
    public int MembershipCode { get; set; }
    public string MemberDNI { get; set; }
    public int Points { get; set; }
    public string FullName { get; set; }
}

public class MembershipInput
{
    public string DNI { get; set; }
    public string fullName { get; set; }
}