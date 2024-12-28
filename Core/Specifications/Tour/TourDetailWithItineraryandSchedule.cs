using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specification;

namespace Core.Specifications
{
    public class TourDetailWithItineraryandSchedule : BaseSpecification<Tour>
    {
        public TourDetailWithItineraryandSchedule(int id) : base(t => t.Id == id)
        {
            AddInclude(t =>  t.Images);
            AddInclude(t =>  t.Itineraries);
            AddNestedInclude("Itineraries.Images");
            AddInclude(t =>  t.Schedules);
        }
    }
}