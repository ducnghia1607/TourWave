using System;

namespace Core.Entities;

public class TourType : BaseEntity
{
    public required string TypeName {get;set;}
     public ICollection<TourWithType>  TourWithTypes {get;set; } = [];
}
