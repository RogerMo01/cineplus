public class MappingSale: Profile
{
    public MappingSale()
    {
        CreateMap<OnlineSales, CustomerPurchases>()
            .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.SaleIdentifier)) 
            .ForMember(dest => dest.date, opt => opt.MapFrom(src => src.DateTimeId))
            .ForMember(dest => dest.payed, opt => opt.MapFrom(src => src.FinalPrice))
            .ForMember(dest => dest.datePurchase, opt => opt.MapFrom(src => src.DateOfPurchase))
            .ForMember(dest => dest.movie, opt => opt.MapFrom(src => src.Ticket.MovieProgramming.Movie.Title))
            .ForMember(dest => dest.room, opt => opt.MapFrom(src => src.Ticket.MovieProgramming.Room.Name))
            .ForMember(dest => dest.seat, opt => opt.MapFrom(src => src.Ticket.Code));
           
    }
}