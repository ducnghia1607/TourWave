using System;
using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.DataHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
        {
            CreateMap<Tour,TourDto>().ForMember(d => d.ImageUrl,o => o.MapFrom(p => p.Images.FirstOrDefault().Url));
        }
}
