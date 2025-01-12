using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Infrastructure.Services
{
    public class TourService(TourContext context,IPhotoService photoService) : ITourService
    {
        public async Task<string> GenerateNewTourCode()
        {
            var maxTourCode = await context.Tours
                .Where(x => x.TourCode != null)
                .MaxAsync(x => x.TourCode);

            var maxCode = int.TryParse(maxTourCode, out var parsedCode) ? parsedCode : 0;
            var newCode = maxCode + 1;
            return newCode.ToString("D4"); 
        }

        public async Task<bool> CheckAlreadyReview(int tourId,int userId)
        {
            var user = await context.Users.Include(x => x.Reviews).Where(x => x.Id == userId).FirstOrDefaultAsync();
            if (user.Reviews.Any(x => x.TourId == tourId)) return true;
            return false;

        }

        public async Task TourWTToRemove(int tourId)
        {
            
            var item =  await context.TourWithTypes.Where(x => x.TourId == tourId).ToListAsync();
            context.TourWithTypes.RemoveRange(item);
        }
        public IDbContextTransaction GetTransaction()
        {
            return context.Database.BeginTransaction();
        }

        public  void DeleteImageForEntity(Tour tour)
        {
            try{
                if(tour != null)
                {
                    var itineraries = tour.Itineraries;
                    foreach(var itinerary in itineraries)
                    {
                        if(itinerary.Images.Count > 0)
                        context.Images.RemoveRange(itinerary.Images);
                    }
                    context.Itinerarys.RemoveRange(itineraries);
                    var reviews = tour.Reviews;
                    foreach (var review in reviews)
                    {
                        if(review.Images.Count > 0)
                        context.Images.RemoveRange(review.Images);
                    }
                    context.Itinerarys.RemoveRange(itineraries);
                    context.Reviews.RemoveRange(reviews);
                }

            }catch(Exception ex){
                throw new Exception(ex.Message);
            }
        }

    }
}
