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

            // CreateMap<Tour, TourDto>().ForMember(dest => dest.DepartureDate, o => o.MapFrom(src => src.Schedules.FirstOrDefault().DepartureDate.ToString()));
        }

    }

}
