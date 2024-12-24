using Core.Entities;

namespace API.DTOs;

public class TourDetailDto : TourDto
{
    public List<string> Utilities { get; set; } = new();
    public List<Image> Images { get; set; } = new();
    public List<Itinerary> Itineraries { get; set; } = new();
    public List<Schedule> Schedules { get; set; } = new();
}
