using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class TourListWithSearchSpecification : BaseSpecification<Tour>
    {
        public TourListWithSearchSpecification(TourSpecParams specParams) : 
            base(t => (t.Title.ToLower() == specParams.Search.ToLower() && t.Schedules.SingleOrDefault(s => s.DepartureDate >= DateOnly.Parse(specParams.Date)) != null && t.Departure.ToLower() == specParams.Departure.ToLower()) 
            || (t.Destination.ToLower() == specParams.Search.ToLower() && t.Schedules.SingleOrDefault(s => s.DepartureDate >= DateOnly.Parse(specParams.Date)) != null && t.Departure.ToLower() == specParams.Departure.ToLower()) 
            || (t.Title.Contains(specParams.Search) && t.Schedules.SingleOrDefault(s => s.DepartureDate >= DateOnly.Parse(specParams.Date)) != null) && t.Departure.ToLower() == specParams.Departure.ToLower())
        {
            ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);
            AddInclude(t => t.Images);
            switch (specParams.Sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.PriceAdult);
                    break;
                case "priceDesc":
                    AddOrderByDescending(x => x.PriceAdult);
                    break;
                default:
                    AddOrderBy(x => x.Duration);
                    break;
            }
            // AddInclude(t =>  t.Itineraries);
            // AddNestedInclude("Itineraries.Images");
            AddInclude(t => t.Schedules);
        }

    }
}
