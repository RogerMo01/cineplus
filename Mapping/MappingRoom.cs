public class MappingRoom : Profile
{
    public MappingRoom()
    {
        CreateMap<RoomDto, Room>()
            .ForMember(room => room.RoomId, opt => opt.Ignore())  // Ignorar la propiedad RoomId
            .ForMember(room => room.Name, opt => opt.MapFrom(src => src.name))
            .ForMember(room => room.SeatsCount, opt => opt.MapFrom(src => src.seats));

        CreateMap<Room, RoomDto>()
            .ForMember(room => room.id, opt => opt.MapFrom(src => src.RoomId))
            .ForMember(room => room.name, opt => opt.MapFrom(src => src.Name))
            .ForMember(room => room.seats, opt => opt.MapFrom(src => src.SeatsCount));
    }
}
