public class MappingMovieProgramming : Profile
{
    public MappingMovieProgramming()
    {
        CreateMap<ProgrammingData, MovieProgramming>()
            .ForMember(dest => dest.Identifier, opt => opt.Ignore())
            .ForMember(dest => dest.MovieId, opt => opt.Ignore())
            .ForMember(dest => dest.RoomId, opt => opt.Ignore())
            .ForMember(dest => dest.DateTimeId, opt => opt.Ignore())
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
            .ForMember(dest => dest.PricePoints, opt => opt.MapFrom(src => src.Points))
            .ForMember(dest => dest.Room, opt => opt.Ignore()) 
            .ForMember(dest => dest.Movie, opt => opt.Ignore()); 

        CreateMap<MovieProgramming, ProgrammingData>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Identifier))
            .ForMember(dest => dest.Movie, opt => opt.MapFrom(src => src.Movie.Title))
            .ForMember(dest => dest.Room, opt => opt.MapFrom(src => src.Room.Name))
            .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.DateTimeId))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
            .ForMember(dest => dest.Points, opt => opt.MapFrom(src => src.PricePoints));
        
        CreateMap<MovieProgramming, Ticket>()
            .ForMember(dest => dest. MovieId, opt => opt.MapFrom(src => src.MovieId))
            .ForMember(dest => dest. RoomId, opt => opt.MapFrom(src => src.RoomId))
            .ForMember(dest => dest. DateTimeId, opt => opt.MapFrom(src => src.DateTimeId))
            .ForMember(dest => dest. SeatId, opt => opt.Ignore())
            .ForMember(dest => dest. Price, opt => opt.MapFrom(src => src.Price))
            .ForMember(dest => dest. PricePoints, opt => opt.MapFrom(src => src.PricePoints))
            .ForMember(dest => dest. Code, opt => opt.Ignore());


    }

}