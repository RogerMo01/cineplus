public class MappingActor : Profile
{
    public MappingActor()
    {
        CreateMap<ActorDto, Actor>()
            .ForMember(actor => actor.ActorId, opt => opt.Ignore()) 
            .ForMember(actor => actor.Name, opt => opt.MapFrom(src => src.name));

        CreateMap<Actor, ActorDto>()
            .ForMember(actor => actor.id, opt => opt.MapFrom(src => src.ActorId))
            .ForMember(actor => actor.name, opt => opt.MapFrom(src => src.Name));
    }
}