using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class UserPhoto : BaseEntity
    {
        public string Url { get; set; }
        public string? PublicId { get; set; }
        public AppUser? AppUser { get; set; }
        public int ?AppUserId { get; set; }

    }
}