using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class PlaceSpecification : BaseSpecification<Place,string>
    {
        public PlaceSpecification(string keyword) : base(x => x.Name.Contains(keyword))
        {
            AddSelect(x => x.Name);
            ApplyDistinct();
        }
    }
}
