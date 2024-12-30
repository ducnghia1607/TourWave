using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class SchedulesWithFilter : BaseSpecification<Schedule>
    {
        public SchedulesWithFilter(string date,string tourId) : base(s => s.DepartureDate >= DateOnly.Parse(date) && s.Tour.Id == int.Parse(tourId)) 
        {
        }
    }
}
