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
        string.IsNullOrEmpty(specParams.Search)|| t.Title.Contains(specParams.Search) || t.TourCode.Contains(specParams.Search)
        || t.Destination.Contains(specParams.Search) || t.Departure.Contains(specParams.Search)
    )
    {
            AddInclude(t => t.Images);
            ApplyPaging(specParams.PageSize *(specParams.PageIndex - 1),specParams.PageSize);
        switch (specParams.SortBy)
        {
            case "tourCode":
                if (specParams.Sort == "desc")
                {
                AddOrderByDescending(x => x.TourCode);
                }
                else
                {
                    AddOrderBy(x => x.TourCode);
                }
                break;
            case "tourTitle":
                if (specParams.Sort == "desc")
                {
                    AddOrderByDescending(x => x.Title);
                }
                else
                {
                    AddOrderBy(x => x.Title);
                }
                break;
            case "priceAdult":
                if (specParams.Sort == "desc")
                {
                    AddOrderByDescending(x => x.PriceAdult);
                }
                else
                {
                    AddOrderBy(x => x.PriceAdult);
                }
                break;
            case "priceChild":
                if (specParams.Sort == "desc")
                {
                    AddOrderByDescending(x => x.PriceChild);
                }
                else
                {
                    AddOrderBy(x => x.PriceChild);
                }
                break;
            default:
                    AddOrderByDescending(x => x.CreatedAt);
                break;

        }

}
        public TourSpecification(int id) : base(x => x.Id == id){
        AddInclude(x => x.Images);
        AddInclude(x => x.Itineraries);
        // AddInclude(x => x.Reviews);
        // AddInclude(x => x.Consultings);
        // AddInclude(x => x.Bookings);
        AddInclude(x => x.TourWithType);
        AddNestedInclude("Itineraries.Images");
        AddNestedInclude("Reviews.Images");
    }






}
