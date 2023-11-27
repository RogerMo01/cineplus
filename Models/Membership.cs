using System.ComponentModel.DataAnnotations;

namespace CineplusDB.Models;

public class Membership
{
    [Key]
    public int MembershipCode { get; set; }
    public string MemberDNI { get; set; }
    public int Points { get; set; }
    public string FullName { get; set; }
    public int ClientID { get; set; }

    public virtual Client Client { get; set; }
}
public class MembershipData
{
    public int MembershipCode { get; set; }
    public string MemberDNI { get; set; }
    public int Points { get; set; }
    public string FullName { get; set; }
}