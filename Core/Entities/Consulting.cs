using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Consulting : BaseEntity
    {
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Note { get; set; }
        public AppUser ?AppUser { get; set; } // CreatedBy
        public int ?AppUserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Tour ?Tour { get; set; }
        public int ?TourId { get; set; }
    }
}
