using System;

namespace Core.Entities;

public class TourWithType : BaseEntity
{
    public int TourId {get;set;}
    public int TourTypeId {get;set;}

    public Tour Tour{get;set;}
    public TourType TourType{get;set;}
}
