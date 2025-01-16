using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class TourRecommendSpecification : BaseSpecification<Tour>
    {
        public TourRecommendSpecification() : base()
        {
            AddInclude(x => x.TourWithType);
            AddInclude(x => x.Images);
            AddInclude(t => t.Schedules.Where(s => s.DepartureDate >= DateOnly.FromDateTime(DateTime.Now)));
        }
    }
}
