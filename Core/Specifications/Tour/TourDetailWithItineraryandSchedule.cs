using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specification;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Core.Specifications
{
    public class TourDetailWithItineraryandSchedule : BaseSpecification<Tour>
    {
        public TourDetailWithItineraryandSchedule(int id,string ?date) : base(t => t.Id == id)
        {
            AddInclude(t =>  t.Images);
            AddInclude(t =>  t.Itineraries);
            AddNestedInclude("Itineraries.Images");
            if (string.IsNullOrEmpty(date) || date == "null")
            {
                AddInclude(t => t.Schedules.Where(s => s.DepartureDate >= DateOnly.FromDateTime(DateTime.Now)));
            }
            else
            {
                AddInclude(t => t.Schedules.Where(s => s.DepartureDate >= DateOnly.Parse(date)));
            }
            AddNestedInclude("Schedules.Bookings");
            AddInclude(t =>  t.TourWithType);
        }
        public TourDetailWithItineraryandSchedule(int id) : base(t => t.Id == id)
        {
            AddInclude(t => t.Images);
            AddInclude(t => t.Itineraries);
            AddNestedInclude("Itineraries.Images");
            AddInclude(t => t.Schedules);
            AddNestedInclude("Schedules.Bookings");
            AddInclude(t => t.TourWithType);
        }
    }
}