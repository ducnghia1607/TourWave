using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Itinerary : BaseEntity
    {
        public string TimeTravel { get; set; }
        public string Title {get;set;}
        public List<Description> Contents{get;set;} = new ();
        public List<Image> ?Images {get;set;}  = new ();
        public int TourId {get;set;}
        public Tour Tour {get;set;}
    }
}