public class MappingCriterion : Profile
{
    public MappingCriterion()
    {
        CreateMap<Criterion, CriterionDto>()
            .ForMember(criterion => criterion.id, opt => opt.MapFrom(src => src.CriterionId))
            .ForMember(criterion => criterion.name, opt => opt.MapFrom(src => src.Name));
        
        CreateMap<ActiveCriterion, CriterionDto>()
            .ForMember(criterion => criterion.id, opt => opt.MapFrom(src => src.CriterionId))
            .ForMember(criterion => criterion.name, opt => opt.Ignore());
    }
}