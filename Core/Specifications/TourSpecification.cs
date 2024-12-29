using System;
using System.Linq.Expressions;
using Core.Entities;
using Core.Specifications;

namespace Core.Specification;

public class TourSpecification : BaseSpecification<Tour>
{
    // string ?destination
    //(specParams.Departure.Count == 0 || specParams.Departure.Contains(t.Departure))
    public TourSpecification(TourSpecParams specParams) : base(t => 
        (string.IsNullOrEmpty(specParams.Search)|| t.Title.Contains(specParams.Search)) &&
        (t.Departure.ToLower() == specParams.Departure || string.IsNullOrEmpty(specParams.Departure))
    )
    {
            AddInclude(t => t.Images);
            ApplyPaging(specParams.PageSize *(specParams.PageIndex - 1),specParams.PageSize);
            switch(specParams.Sort){
                case "priceAsc":
                    AddOrderBy(x => x.PriceAdult);
                    break;
                case "priceDesc":
                    AddOrderByDescending(x => x.PriceAdult);
                    break;
                default:
                    AddOrderBy(x => x.Title);
                    break;
            }
    }






}
