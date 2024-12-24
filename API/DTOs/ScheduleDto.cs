namespace API.DTOs;
public class ScheduleDto{
    public DateOnly DepartureDate { get; set; }
    public DateOnly ReturnDate { get; set; }
    public int RemainingSpot {get;set;}
}
