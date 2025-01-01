using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class TourHobby : BaseEntity
    {
        public  string Name { get; set; }
        public ICollection<TourTypeHobby>  TourTypeHobby {get;set; } = [];

    }
}
