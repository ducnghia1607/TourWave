using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Specification;

namespace Core.Specifications
{
    public class CheckCanReviewSpecification : BaseSpecification<Entities.Booking>
    {
        public CheckCanReviewSpecification(int tourId,int uid) : base(x => x.TourId == tourId && x.AppUserId == uid && x.PaymentStatus == "1" && x.Schedule.ReturnDate >= DateOnly.FromDateTime(DateTime.Parse("2025-01-06")))
        {   
    
        }
    }
}