
using Core.Entities;

namespace API.DTOs
{
    public class CreateTourDto
    {
        public required string Title { get; set; }

        public required string Description { get; set; }

        public decimal PriceAdult { get; set; }

        public decimal PriceChild { get; set; }

        public required string Duration { get; set; }
        public required string Departure { get; set; }
        public bool Availability { get; set; }
        public List<Image> Images { get; set; } = new ();
        public List<string> Itinerary { get; set; } = new ();
        public ICollection<TourWithType>  TourWithTypes {get;set; } = [];
    }
}