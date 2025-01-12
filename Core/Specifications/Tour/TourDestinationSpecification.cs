using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class TourDestinationSpecification : BaseSpecification<Tour, string>
    {
        public TourDestinationSpecification(string keyword) : base(x => x.Destination.Contains(keyword))
        {
            AddSelect(x => x.Destination);
            ApplyDistinct();
        }
    }
}
