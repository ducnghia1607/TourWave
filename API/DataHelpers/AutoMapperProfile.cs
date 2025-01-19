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
                .ForMember(dest => dest.Departure, o => o.MapFrom(src => src.Tour.Departure))
                .ForMember(dest => dest.Destination, o => o.MapFrom(src => src.Tour.Destination))
                .ForMember(dest => dest.DepartureDate, o => o.MapFrom(src => src.DepartureDate.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.ReturnDate, o => o.MapFrom(src => src.ReturnDate.ToString("yyyy-MM-dd")))

                ;

            CreateMap<Image, ImageDto>();
            CreateMap<TourType, TourTypeDto>();

            CreateMap<Review, ReviewDto>()
                .ForMember(dest => dest.FullName,o => o.MapFrom(src => src.AppUser.FullName))
                .ForMember(dest => dest.Gender,o => o.MapFrom(src => src.AppUser.Gender))
                 .ForMember(dest => dest.CreatedAt, o => o.MapFrom(src => DateOnly.FromDateTime(src.CreatedAt).ToString("dd-MM-yyyy")))
                 .ForMember(dest => dest.ImagesUrl, o => o.MapFrom(src => src.Images.Select(img => img.Url).ToList()))
                 .ForMember(dest => dest.TourTitle, o => o.MapFrom(src => src.Tour.Title))

                ;

            CreateMap<Tour, TourEditDto>().ForMember(dest => dest.TourWithType,
                     o => o.MapFrom(src => src.TourWithType.Select(x => x.TourTypeId).ToList()))
                .ForMember(dest => dest.Transport,o=> o.MapFrom(src => src.Transport.Split(',', System.StringSplitOptions.None).ToList()  ));
            // CreateMap<Tour, TourDto>().ForMember(dest => dest.DepartureDate, o => o.MapFrom(src => src.Schedules.FirstOrDefault().DepartureDate.ToString()));
        }

    }

}
