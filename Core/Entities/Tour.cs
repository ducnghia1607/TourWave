
namespace Core.Entities;

public class Tour : BaseEntity
{
 public required string Title { get; set; }
 public string ?TourCode { get; set; }
 public List<string> Utilities {get;set;} = new ();
 public required string Description { get; set; }
 public decimal PriceAdult { get; set; }
 public decimal PriceChild { get; set; }
 public int Capacity {get;set;}
public required string Duration { get; set; }
public required string Departure { get; set; }
public string? Destination { get; set; }
public bool Availability { get; set; }
public string ?Transport {get;set;}
public DateTime CreatedAt { get; set; }
public DateTime ModifiedAt { get; set; }
public string ? CreatedBy { get; set; }
public string ? ModifiedBy { get; set; }
public List<Image> Images { get; set; } = new ();
 public List<Itinerary> Itineraries { get; set; } = new ();
 public ICollection<TourWithType>  TourWithType {get;set; } = [];
  public List<Schedule> Schedules{get;set;} = new ();
}
