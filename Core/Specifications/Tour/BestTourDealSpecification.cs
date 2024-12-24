using System;
using Core.Specification;
using Core.Entities;
using System.Linq.Expressions;
namespace Core.Specifications;

public class BestTourDealSpecification : BaseSpecification<Tour>
{
    
    // Where : Điểm review cao 
    public BestTourDealSpecification() : base()
    {
        AddInclude(x => x.Images);
        ApplyPaging(0,6);
    }
    
}
