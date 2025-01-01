using System;

namespace Core.Entities;

public class TourType : BaseEntity
{
     public required string Name {get;set;}
     public ICollection<TourWithType>  TourWithType {get;set; } = [];
     public ICollection<TourTypeHobby>  TourTypeHobby {get;set; } = [];
}
