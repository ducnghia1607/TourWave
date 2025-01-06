using Core.Entities;

namespace API.DTOs
{
    public class ReviewDto
    {
        public string FullName { get; set; }
        public string Gender { get; set; }
        public string TourTitle { get; set; }

        public string Description { get; set; }
        public int Rating { get; set; }
        public List<string>? ImagesUrl { get; set; }
        public string CreatedAt { get; set; }
    }
}
