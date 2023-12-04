public class MappingDiscount : Profile
{
    public MappingDiscount()
    {
        CreateMap<DiscountDto, Discount>()
            .ForMember(discount => discount.DiscountId, opt => opt.Ignore())
            .ForMember(discount => discount.Concept, opt => opt.MapFrom(src => src.concept))
            .ForMember(discount => discount.Percent, opt => opt.MapFrom(src => src.percent))
            .ForMember(discount => discount.IsDeleted, opt => opt.Ignore());

        CreateMap<Discount, DiscountDto>()
            .ForMember(discount => discount.id, opt => opt.MapFrom(src => src.DiscountId))
            .ForMember(discount => discount.concept, opt => opt.MapFrom(src => src.Concept))
            .ForMember(discount => discount.percent, opt => opt.MapFrom(src => src.Percent));
    }
}