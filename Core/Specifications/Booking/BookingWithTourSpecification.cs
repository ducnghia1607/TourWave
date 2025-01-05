using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specification;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Core.Specifications
{
    public class BookingWithTourSpecification : BaseSpecification<Booking>
    {
        public BookingWithTourSpecification(int bookingId) : base(x => x.Id == bookingId)
        {
            AddInclude(x => x.Tour);
            AddInclude(x => x.AppUser);
        }

        public BookingWithTourSpecification(string sort, string order, int page, string date, string search,string departureDate) : base(x => (string.IsNullOrEmpty(date) || x.CreateDate.HasValue && DateOnly.FromDateTime(x.CreateDate.Value) == DateOnly.Parse(date))
        && (string.IsNullOrEmpty(search) || x.FullName.Contains(search) || x.Tour.TourCode.Contains(search))
         && (string.IsNullOrEmpty(departureDate) || x.DepartureDate == DateOnly.Parse(departureDate))
        )
        {
            ApplyPaging(10 * (page - 1), 10);
            switch (sort)
            {
                case "createdAt":
                    if (order == "desc")
                        AddOrderByDescending(x => x.CreateDate);
                    else
                    {
                        AddOrderBy(x => x.CreateDate);
                    }
                    break;
                case "fullName":
                    if (order == "desc")
                        AddOrderByDescending(x => x.AppUser.FullName);
                    else
                    {
                        AddOrderBy(x => x.AppUser.FullName);
                    }
                    break;
                case "paymentStatus":
                    if (order == "desc")
                        AddOrderByDescending(x => x.PaymentStatus);
                    else
                    {
                        AddOrderBy(x => x.PaymentStatus);
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
                case "amount":
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
    }
}