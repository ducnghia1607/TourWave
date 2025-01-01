using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class TourRelatedSpecification : BaseSpecification<Tour>
    {
        public TourRelatedSpecification(string destination,string tourCode) : base(x => x.Destination == destination && x.TourCode != tourCode )
        {
            AddInclude(x => x.Images);
            AddOrderBy(x => Guid.NewGuid());
        }
    }
}
