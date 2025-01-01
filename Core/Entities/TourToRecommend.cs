using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class TourToRecommend : Tour
    {
        public decimal HobbySuitability{get;set;}
        public decimal PriceSuitability { get; set; }
        public decimal HistorySuitability { get; set; }
        public decimal DateSuitability { get; set; }
    }
}