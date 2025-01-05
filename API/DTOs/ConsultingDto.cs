using Core.Entities;

namespace API.DTOs
{
    public class ConsultingDto 
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Note { get; set; }
        public string TourTitle { get; set; }
        public string TourCode { get; set; }
        //public AppUser? AppUser { get; set; } // CreatedBy
        //public int? AppUserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Status { get; set; }
        //public Tour? Tour { get; set; }

        //public int? TourId { get; set; }
    }
}
