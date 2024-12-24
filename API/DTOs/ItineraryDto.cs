using Core.Entities;

namespace API.DTOs;

public class ItineraryDto{
        public string TimeTravel { get; set; }
        public string Title {get;set;}
        public List<string> Description{get;set;} = new ();
        public List<Image> ?Images {get;set;}  = new ();
        public int TourId {get;set;}
        public Tour Tour {get;set;}
}