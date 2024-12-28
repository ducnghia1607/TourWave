using System;
using System.Linq.Expressions;
using Core.Entities;
using Core.Specifications;

namespace Core.Specification;

public class TourSpecification : BaseSpecification<Tour>
{
    // string ?destination
    public TourSpecification(TourSpecParams specParams) : base(t => 
        (string.IsNullOrEmpty(specParams.Search)|| t.Title.Contains(specParams.Search)) &&
        (specParams.Departure.Count == 0 || specParams.Departure.Contains(t.Departure))
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

             public TourSpecification(string keyword) : base(t => t.Title.ToLower() == keyword.ToLower() || t.Title.ToLower().Contains(keyword.ToLower()))
        {
            AddInclude(t =>  t.Images);
            // AddInclude(t =>  t.Itineraries);
            // AddNestedInclude("Itineraries.Images");
            AddInclude(t =>  t.Schedules);
        }

        public TourSpecification(string searchTerm,TourSpecParams specParams) : base(t => (t.Title.ToLower() == searchTerm.ToLower() && t.Schedules.SingleOrDefault(s => s.DepartureDate >=  DateOnly.Parse(specParams.Date))!= null) || (t.Destination.ToLower() == searchTerm.ToLower() && t.Schedules.SingleOrDefault(s => s.DepartureDate >= DateOnly.Parse(specParams.Date)) != null) || (t.Title.Contains(searchTerm) && t.Schedules.SingleOrDefault(s => s.DepartureDate >= DateOnly.Parse(specParams.Date)) != null))
        {
            ApplyPaging(specParams.PageSize *(specParams.PageIndex - 1),specParams.PageSize);
            AddInclude(t =>  t.Images);
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
            // AddInclude(t =>  t.Itineraries);
            // AddNestedInclude("Itineraries.Images");
            AddInclude(t => t.Schedules);
        }

        public TourSpecification(string title,string tourCode) : base(t => t.Title.ToLower() == title.ToLower() || t.TourCode.ToLower() == tourCode.ToLower()) 
        {
            AddInclude(t => t.Images);
            AddInclude(t => t.Itineraries);
            AddNestedInclude("Itineraries.Images");
            AddInclude(t => t.Schedules);
        }

}
