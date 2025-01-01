using System;
using Core.Entities;
using Core.Specification;

namespace Core.Specifications;

public class InternationalTourSpecfication : BaseSpecification<Core.Entities.Tour>
{
    public InternationalTourSpecfication() : base(x => x.TourWithType.SingleOrDefault(o => o.TourType.Id == 16) != null)
    {
        AddInclude(x => x.Images);
        ApplyPaging(0,6);
    }
}
