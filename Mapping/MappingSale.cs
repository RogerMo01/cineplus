using cineplus.SalesControler;
using Org.BouncyCastle.Crypto.Agreement.Srp;

public class MappingSale: Profile
{
    public MappingSale()
    {
        CreateMap<OnlineSales, CustomerPurchases>()
            .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.SaleIdentifier)) 
            .ForMember(dest => dest.date, opt => opt.MapFrom(src => src.DateTimeId))
            .ForMember(dest => dest.payed, opt => opt.MapFrom(src => src.FinalPrice))
            .ForMember(dest => dest.datePurchase, opt => opt.MapFrom(src => src.DateOfPurchase))
            .ForMember(dest => dest.movie, opt => opt.Ignore())
            .ForMember(dest => dest.room, opt => opt.Ignore())
            .ForMember(dest => dest.seat, opt => opt.Ignore())
            .AfterMap((src, dest) =>
            {
                dest.movie = src.MovieId.ToString();
            })
            .AfterMap((src, dest) =>
            {
                dest.room = src.RoomId.ToString();
            })  
            .AfterMap((src, dest) =>
            {
                dest.seat = src.SeatId.ToString();
            });
           
    }
}