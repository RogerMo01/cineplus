using Org.BouncyCastle.Math.EC;

public class MappingMovie : Profile
{
    public MappingMovie()
    {
        CreateMap<MovieInput, Movie>()
            .ForMember(dest => dest.MovieId, opt => opt.Ignore())
            .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.title))
            .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.year))
            .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.country))
            .ForMember(dest => dest.Director, opt => opt.MapFrom(src => src.director))
            .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.duration))
            .ForMember(dest => dest.ActorsByFilms, opt => opt.Ignore())  // Ignora las propiedades de navegación
            .ForMember(dest => dest.GenresByFilms, opt => opt.Ignore()) // Ignora las propiedades de navegación
            .ForMember(dest => dest.IsDeleted, opt => opt.Ignore())
            .AfterMap((src, dest) =>
            {
                // Asigna los actores usando los IDs proporcionados en MovieInput
                dest.ActorsByFilms = src.actors.Select(actorId => new ActorByFilm { ActorId = actorId, MovieId = dest.MovieId }).ToList();
            })
            .AfterMap((src, dest) =>
            {
                // Asigna los actores usando los IDs proporcionados en MovieInput
                dest.GenresByFilms = src.genres.Select(genreId => new GenreByFilm { GenreId = genreId, MovieId = dest.MovieId }).ToList();
            });

        CreateMap<Movie, MovieGet>()
            .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.MovieId))
            .ForMember(dest => dest.title, opt => opt.MapFrom(src => src.Title))
            .ForMember(dest => dest.year, opt => opt.MapFrom(src => src.Year))
            .ForMember(dest => dest.country, opt => opt.MapFrom(src => src.Country))
            .ForMember(dest => dest.director, opt => opt.MapFrom(src => src.Director))
            .ForMember(dest => dest.duration, opt => opt.MapFrom(src => src.Duration))
            .ForMember(dest => dest.actors, opt => opt.MapFrom(src => src.ActorsByFilms.Select(a => new ActorDto { id = a.Actor.ActorId, name = a.Actor.Name })))
            .ForMember(dest => dest.genres, opt => opt.MapFrom(src => src.GenresByFilms.Select(g => new GenreDto { id = g.Genre.GenreId, name = g.Genre.Name })));
            
    }          
}