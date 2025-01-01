using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public static class TourRecommend
    {
        public static float CalculatePriceSuitability(float priceAdult,float priceRecommend){
            if(priceAdult > priceRecommend){
                return 0;
            }else if(priceAdult == priceRecommend ){
                return 1;
            }else{
                return (priceRecommend - priceAdult)/ priceRecommend;
            }
            }
        

        public static float DateSuitability(DateOnly departureDate,DateOnly returnDate,string departureDateRecommend,string returnDateRecommend){
            DateOnly do1 = DateOnly.Parse(departureDateRecommend);
            DateOnly do2 = DateOnly.Parse(returnDateRecommend);
            if(departureDate <= do1 && returnDate >= do2) return 1;
            if(returnDate < do1 || do2 < departureDate) return 0;
            else{
                int span = returnDate.Day - departureDate.Day;
                int t1 = Math.Min(do2.Day, returnDate.Day);
                int t2 = Math.Max(do1.Day, departureDate.Day);
                return Math.Max(0,(t1-t2)/span);
            }

            }


            public static float HobbySuitability(DateOnly departureDate,DateOnly returnDate,string departureDateRecommend,string returnDateRecommend){
        DateOnly do1 = DateOnly.Parse(departureDateRecommend);
        DateOnly do2 = DateOnly.Parse(returnDateRecommend);
        if(departureDate <= do1 && returnDate >= do2) return 1;
        if(returnDate < do1 || do2 < departureDate) return 0;
        else{
            int span = returnDate.Day - departureDate.Day;
            int t1 = Math.Min(do2.Day, returnDate.Day);
            int t2 = Math.Max(do1.Day, departureDate.Day);
            return Math.Max(0,(t1-t2)/span);
            }

            }
        }

            
}
        
        
