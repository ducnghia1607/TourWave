using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class BookingForUserSpecification : BaseSpecification<Booking>
    {
        public BookingForUserSpecification(string sort, string order, int page, int userId) : base(x => x.AppUser.Id == userId && x.PaymentStatus == "1") 
        {
            ApplyPaging(10 * (page - 1), 10);
            switch (sort)
            {
                case "date":
                    if (order == "desc")
                        AddOrderByDescending(x => x.DepartureDate);
                    else
                    {
                        AddOrderBy(x => x.DepartureDate);
                    }
                    break;
              
                case "tourCode":
                    if (order == "desc")
                        AddOrderByDescending(x => x.Tour.TourCode);
                    else
                    {
                        AddOrderBy(x => x.Tour.TourCode);
                    }
                    break;
                case "tourTitle":
                    if (order == "desc")
                        AddOrderByDescending(x => x.Tour.Title);
                    else
                    {
                        AddOrderBy(x => x.Tour.Title);
                    }
                    break;
                case "price":
                    if (order == "desc")
                        AddOrderByDescending(x => x.PricePerAdult * x.NumAdults + x.PricePerChild * x.NumChildren);
                    else
                    {
                        AddOrderBy(x => x.PricePerAdult * x.NumAdults + x.PricePerChild * x.NumChildren);
                    }
                    break;
                default:
                    AddOrderByDescending(x => x.CreateDate);
                    break;
                    // AddOrderBy(x => x.Duration);
                    // break;
            }
            AddInclude(x => x.Tour);
            AddInclude(x => x.AppUser);
        }

        public BookingForUserSpecification(int userId) : base(x => x.AppUserId == userId && x.PaymentStatus == "1")
        {
            AddInclude(x => x.Tour);
            AddNestedInclude("Tour.TourWithType");
        }
    }
}
