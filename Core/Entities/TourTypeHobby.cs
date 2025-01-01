using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class TourTypeHobby : BaseEntity
    {
        public TourType TourType { get; set; }
        public int TourTypeId { get; set; }
        public TourHobby TourHobby { get; set; }
        public int TourHobbyId { get; set; }
        public decimal Appropriate  {get;set;}
    }
}
