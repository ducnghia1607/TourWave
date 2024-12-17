using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specification;

public class TourSpecification : BaseSpecification<Tour>
{
    // string ?destination
    public TourSpecification(string ?departure,string?sort) : base(t => 
        string.IsNullOrWhiteSpace(departure) || t.Departure == departure
    )
    {
            switch(sort){
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
