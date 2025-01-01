using System;
using System.Linq.Expressions;
using Core.Entities;
using Core.Specification;

namespace Core.Specifications;

public class DomesticTourSpecification : BaseSpecification<Core.Entities.Tour>
{
    public DomesticTourSpecification() : base(x => x.TourWithType.SingleOrDefault(o => o.TourType.Id == 15) != null)
    {
        AddInclude(x => x.Images);
        ApplyPaging(0,6);
    }   
}
