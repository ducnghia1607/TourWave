using Core.Entities;

namespace API.DTOs
{
    public class BookingDto
    {
        public int id { get; set; }
        public int NumChildren { get; set; }
        public int NumAdults { get; set; }
        public decimal PricePerChild { get; set; }
        public decimal PricePerAdult { get; set; }
        public string? PaymentStatus { get; set; }
        public string? TourTitle { get; set; }
        public string? Departure { get; set; }
        public string? Destination { get; set; }
        public string? TourCode { get; set; }
        //public int TourId { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string DepartureDate { get; set; }
        public string ReturnDate { get; set; }
        public string ?Note { get; set; }
        //public string? PaymentIntentId { get; set; }
        //public string? ClientSecret { get; set; }

        public string? PaymentMethodType { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}
