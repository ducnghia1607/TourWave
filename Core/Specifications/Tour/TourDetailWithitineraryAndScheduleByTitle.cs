using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class TourDetailWithitineraryAndScheduleByTitle : BaseSpecification<Tour>
    {

        public TourDetailWithitineraryAndScheduleByTitle(string title, string tourCode) : base(t => t.Title.ToLower() == title.ToLower() || t.TourCode.ToLower() == tourCode.ToLower())
        {
            AddInclude(t => t.Images);
            AddInclude(t => t.Itineraries);
            AddNestedInclude("Itineraries.Images");
            AddInclude(t => t.Schedules);
        }
    }
}
