
namespace Core.Entities;

public class Tour : BaseEntity
{
 public required string Title { get; set; }

 public required string Description { get; set; }

 public decimal PriceAdult { get; set; }

 public decimal PriceChild { get; set; }

public required string Duration { get; set; }
public required string Destination { get; set; }
public bool Availability { get; set; }
public List<TourType> TourTypes {get;set;} = new ();
 public List<Image> Images { get; set; } = new ();

 public List<string> Itinerary { get; set; } = new ();


}
