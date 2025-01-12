using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateOnly? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? FullName { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Consulting> UserConsulting { get; set; }
        public Image? Image { get; set; }
        public ICollection<Booking>? Bookings { get; set; }
        public List<Review>? Reviews { get; set; } = new();
        public string ?Address { get; set; }
    }
}
