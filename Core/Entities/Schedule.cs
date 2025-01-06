using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Schedule : BaseEntity
    {
        public DateOnly DepartureDate { get; set; }
        public DateOnly ReturnDate { get; set; }
        public int TourId {get;set;}
        public Tour ?Tour {get;set;}

        public ICollection<Booking> ?Bookings {get;set;}

        public int BookedCount => Bookings?.Count(b => b.PaymentStatus == "1") ?? 0;

        public int RemainingSpot => 24 - BookedCount;
    }
}