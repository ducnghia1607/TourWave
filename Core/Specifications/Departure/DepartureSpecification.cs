using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications.NewFolder
{
    public class DepartureSpecification : BaseSpecification<Departure, string>
    {
        public DepartureSpecification(string keyword) : base(x => x.Name.Contains(keyword))
        {
            AddSelect(x => x.Name);
            ApplyDistinct();
        }
    }
}
