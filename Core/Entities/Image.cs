using System;

namespace Core.Entities;

public class Image : BaseEntity
{
    public required string Url { get; set; }

    public string ? Caption {get;set;}
    public string ? PublicId{ get; set; }
    public int ?TourId { get; set; }
    public Tour ?Tour {get;set;}
    public int ?ItineraryId { get; set; }
    public Itinerary ?Itinerary {get;set;}

    
    public int ?ReviewId { get; set; }
    public Review ?Review {get;set;}
}
