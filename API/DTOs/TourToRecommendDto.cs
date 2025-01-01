using Core.Entities;

namespace API.DTOs
{
    public class TourToRecommendDto 
    {
        public required string Title { get; set; }
        public string? TourCode { get; set; }
        public decimal PriceAdult { get; set; }
        public decimal PriceChild { get; set; }
        public required string Duration { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<TourWithType> TourWithType { get; set; } = [];
        public List<Schedule> Schedules { get; set; } = new();
        public decimal PriceSuitability { get; set; }
        public decimal HistorySuitability { get; set; }
        public decimal DateSuitability { get; set; }
        public decimal HobbySuitability { get; set; }
    }
}
