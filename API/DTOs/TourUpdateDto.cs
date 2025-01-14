using Core.Entities;

namespace API.DTOs
{
    public class TourUpdateDto
    {
        public string Title { get; set; }
        public string Departure { get; set; }
        public List<string> Utilities { get; set; } = new();
        public List<string>? TopPlaces { get; set; } = new();
        public required string Description { get; set; }
        public decimal PriceAdult { get; set; }
        public decimal PriceChild { get; set; }
        public  string Duration { get; set; }
        public string? Destination { get; set; }
        public string? Transport { get; set; }
        public ICollection<TourWithType> TourWithType { get; set; } = [];
        public ICollection<Itinerary> Itineraries { get; set; } = [];
    }
}
