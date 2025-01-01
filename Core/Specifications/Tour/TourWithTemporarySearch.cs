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
    public class TourWithTemporarySearch : BaseSpecification<Core.Entities.Tour>
    {
        public TourWithTemporarySearch(string keyword) : base(t => t.Title.ToLower() == keyword.ToLower() || t.Title.ToLower().Contains(keyword.ToLower()))
        {
            AddInclude(t => t.Images);
            AddInclude(t => t.Schedules);
        }
    }
}
