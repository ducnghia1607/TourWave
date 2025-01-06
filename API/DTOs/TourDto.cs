using System;

namespace API.DTOs;

public class TourDto
{
    public int Id{get;set;}
 public required string Title { get; set; }
 public string ?TourCode { get; set; }
 public decimal PriceAdult { get; set; }
 public decimal PriceChild { get; set; }
public  string Duration { get; set; }
public  string Departure { get; set; }
public string Destination { get; set; }
public string Transport {get;set;}
public string ImageUrl { get; set; }
public string DepartureDate { get; set; }
public List<string> TopPlaces { get; set; }
}
