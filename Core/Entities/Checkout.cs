using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Checkout : BaseEntity
    {

        
        public Tour Tour { get; set; }
        public int TourId { get; set; }

        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}