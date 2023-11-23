public class MappingGenre : Profile
{
    public MappingGenre()
    {
        CreateMap<GenreDto, Genre>()
            .ForMember(genre => genre.GenreId, opt => opt.Ignore()) 
            .ForMember(genre => genre.Name, opt => opt.MapFrom(src => src.name));

        CreateMap<Genre, GenreDto>()
            .ForMember(genre => genre.id, opt => opt.MapFrom(src => src.GenreId))
            .ForMember(genre => genre.name, opt => opt.MapFrom(src => src.Name));
    }
}