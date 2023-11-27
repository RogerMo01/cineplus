public class MappingMembership : Profile
{
    public MappingMembership()
    {
         CreateMap<MembershipInput, Membership>()
            .ForMember(dest => dest.MembershipCode, opt => opt.Ignore())
            .ForMember(dest => dest.MemberDNI, opt => opt.MapFrom(src => src.DNI))
            .ForMember(dest => dest.Points, opt => opt.MapFrom(src => 0))
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.fullName));

    }
}