using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.DataHelpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Tour, TourDto>()
    .ForMember(dest => dest.ImageUrl,
               o => o.MapFrom(src => src.Images.FirstOrDefault().Url))
       .ForMember(dest => dest.DepartureDate,
               o => o.MapFrom(src => src.Schedules.FirstOrDefault().DepartureDate.ToString("yyyy-MM-dd")))         
               ;

            CreateMap<Tour, TourToRecommendDto>().ForMember(dest => dest.ImageUrl,
                   o => o.MapFrom(src => src.Images.FirstOrDefault().Url));

                CreateMap<Consulting, ConsultingDto>().ForMember(dest => dest.TourTitle,
                   o => o.MapFrom(src => src.Tour.Title))
                    .ForMember(dest => dest.TourCode,o => o.MapFrom(src => src.Tour.TourCode))

         ;

            CreateMap<Booking, BookingDto>().ForMember(dest => dest.TourTitle,
                 o => o.MapFrom(src => src.Tour.Title))
                .ForMember(dest => dest.TourCode, o => o.MapFrom(src => src.Tour.TourCode))
                .ForMember(dest => dest.DepartureDate, o => o.MapFrom(src => src.DepartureDate.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.ReturnDate, o => o.MapFrom(src => src.ReturnDate.ToString("yyyy-MM-dd")))

                ;
            // CreateMap<Tour, TourDto>().ForMember(dest => dest.DepartureDate, o => o.MapFrom(src => src.Schedules.FirstOrDefault().DepartureDate.ToString()));
        }

    }

}
