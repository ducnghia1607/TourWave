using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class TourUpdate
    {
        public string Title { get; set; }
        public string Departure { get; set; }
        public List<string> Utilities { get; set; } = new();
        public List<string>? TopPlaces { get; set; } = new();
        public required string Description { get; set; }
        public decimal PriceAdult { get; set; }
        public decimal PriceChild { get; set; }
        public string Duration { get; set; }
        public string? Destination { get; set; }
        public string? Transport { get; set; }
        public ICollection<TourWithType> TourWithType { get; set; } = [];
        public List<Itinerary> Itineraries { get; set; } = new();

    }
}
