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

        public TourDetailWithitineraryAndScheduleByTitle(string title, string tourCode,string ?date) : base(t => t.Title.ToLower() == title.ToLower() || t.TourCode.ToLower() == tourCode.ToLower())
        {
            AddInclude(t => t.Images);
            AddInclude(t => t.Itineraries);
            AddNestedInclude("Itineraries.Images");
            // AddInclude(t => t.Schedules);
            if (string.IsNullOrEmpty(date) || date=="null")
            {
                AddInclude(t => t.Schedules.Where(s => s.DepartureDate >= DateOnly.FromDateTime(DateTime.Now)));
            }
            else
            {
                AddInclude(t => t.Schedules.Where(s => s.DepartureDate >= DateOnly.Parse(date)));
            }
           
        }
    }
}
