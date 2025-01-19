using Core.Entities;
using Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class BookingSpecification : BaseSpecification<Booking>
    {
        public BookingSpecification(int bookingId) : base(x => x.Id == bookingId)
        {
            AddInclude(x => x.Tour);
            AddInclude(x => x.Schedule);
        }
    }
}
