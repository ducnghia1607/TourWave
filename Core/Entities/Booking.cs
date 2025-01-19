using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Booking : BaseEntity
    {
        public int NumChildren { get; set; }
        public int NumAdults { get; set; }
        public decimal PricePerChild {get;set;}
        public decimal PricePerAdult {get;set;}

        public string FullName{get;set;}
        public string Phone{get;set;}
        public string Email{get;set;}
        public string Gender{get;set;}
        public string ?Note{get;set;}

        public string? PaymentStatus { get; set; } = "0"; // 0 : Ch? thanh to�n 1 : Th�nh c�ng , 2: Th?t b?i
        public string? PaymentType { get; set; } // 1 : Online 2: On-counter
        public string ?Status {get;set; }
        public Tour ?Tour { get; set; }
        public int TourId { get; set; }
        public AppUser ?AppUser { get; set; }
        public int AppUserId { get; set; }
        public Schedule? Schedule { get; set; }
        public int ScheduleId { get; set; }
        public DateOnly DepartureDate { get; set; }
        public DateOnly ReturnDate { get; set; }
        public string? PaymentIntentId { get; set; }
        public string? ClientSecret { get; set; }

        public string? PaymentMethodType { get; set; }
        public DateTime ?CreateDate { get; set; }
    }
}