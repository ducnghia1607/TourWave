using CloudinaryDotNet.Actions;
using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Core.Specifications
{
    public class ScheduleSpecification : BaseSpecification<Schedule>
    {
        public ScheduleSpecification(int id,int tourId) : base(x => x.TourId == tourId && x.Id == id )
        {

        }
        public ScheduleSpecification(int tourId,string sort,string order,int page,string date) : base(s => (string.IsNullOrEmpty(date) || s.DepartureDate >= DateOnly.Parse(date)) && s.TourId == tourId)
        {
            ApplyPaging(10 * (page - 1), 10);
            switch (sort)
            {
                case "departureDate":
                    if (order == "desc")
                        AddOrderByDescending(x => x.DepartureDate);
                    else
                    {
                        AddOrderBy(x => x.DepartureDate);
                    }
                    break;
                case "returnDate":
                    if (order == "desc")
                        AddOrderByDescending(x => x.ReturnDate);
                    else
                    {
                        AddOrderBy(x => x.ReturnDate);
                    }
                    break;
                //case "remainingSpot":
                //    if (order == "desc")
                //        AddOrderByDescending(x => x.RemainingSpot);
                //    else
                //    {
                //        AddOrderBy(x => x.RemainingSpot);
                //    }
                //    break;
                case "priceAdult":
                    if (order == "desc")
                        AddOrderByDescending(x => x.PriceAdult);
                    else
                    {
                        AddOrderBy(x => x.PriceAdult);
                    }
                    break;
                case "priceChild":
                    if (order == "desc")
                        AddOrderByDescending(x => x.PriceChild);
                    else
                    {
                        AddOrderBy(x => x.PriceChild);
                    }
                    break;
                default:
                    AddOrderByDescending(x => x.DepartureDate);
                    break;
            }
        }
    }
}
