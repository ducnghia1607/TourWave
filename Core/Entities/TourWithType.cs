using System;

namespace Core.Entities;

public class TourWithType 
{
    public int TourId {get;set;}
    public int TourTypeId {get;set;}

    public Tour Tour{get;set;}
    public TourType TourType{get;set;}
}
