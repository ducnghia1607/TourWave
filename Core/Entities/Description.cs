using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Description : BaseEntity
    {
        public string Content { get; set; }
        public Itinerary Itinerary{get;set;}
        public int ItineraryId{get;set;}

    }
}