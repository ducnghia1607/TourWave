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

        public async Task UpdateTour(TourUpdate tourUpdate, Tour tour)
        {
            var transaction = context.Database.BeginTransaction();
            try {
                context.Attach(tour);
                if (tourUpdate.Title != tour.Title)
                {
                    tour.Title = tourUpdate.Title;
                }
                if (tourUpdate.Departure != tour.Departure)
                {
                    tour.Departure = tourUpdate.Departure;
                }
                tour.Utilities = tourUpdate.Utilities;
                tour.TopPlaces = tourUpdate.TopPlaces;
                if (tourUpdate.Description != tour.Description)
                {
                    tour.Description = tourUpdate.Description;
                }
                if (tourUpdate.PriceAdult != tour.PriceAdult)
                {
                    tour.PriceAdult = tourUpdate.PriceAdult;
                }
                if (tourUpdate.PriceChild != tour.PriceChild)
                {
                    tour.PriceChild = tourUpdate.PriceChild;
                }
                if (tourUpdate.Duration != tour.Duration)
                {
                    tour.Duration = tourUpdate.Duration;
                }
                if (tourUpdate.Destination != tour.Destination)
                {
                    tour.Destination = tourUpdate.Destination;
                }
                if (tourUpdate.Transport != tour.Transport)
                {
                    tour.Transport = tourUpdate.Transport;
                }
                tour.TourWithType = tourUpdate.TourWithType;
                var currentItineraries = tour.Itineraries;
                var updateItineraries = tourUpdate.Itineraries;
                var currentIds = currentItineraries.Select(x => x.Id).ToList();
                var updateIds = updateItineraries.Where(i => i.Id > 0).Select(x => x.Id).ToList();
                var itinerariesToRemove = currentItineraries.Where(i => !updateIds.Contains(i.Id)).ToList();
                if(itinerariesToRemove.Any())
                context.Itinerarys.RemoveRange(itinerariesToRemove);
                // 2. Cập nhật thông tin các itineraries hiện có
                foreach (var itinerary in updateItineraries.Where(i => i.Id > 0))
                {
                    var existingItinerary = currentItineraries.FirstOrDefault(i => i.Id == itinerary.Id);
                    if (existingItinerary != null)
                    {
                        if (existingItinerary.TimeTravel != itinerary.TimeTravel)
                            existingItinerary.TimeTravel = itinerary.TimeTravel;
                        if (existingItinerary.Title != itinerary.Title)
                            existingItinerary.Title = itinerary.Title;
                        if (existingItinerary.Content != itinerary.Content)
                            existingItinerary.Content = itinerary.Content;
                        // Change image                 
                        if (existingItinerary.Images != null && existingItinerary.Images.Count > 0 && itinerary.Images != null && itinerary.Images.Count > 0 && existingItinerary.Images[0].Id != itinerary.Images[0].Id)
                        {
                            existingItinerary.Images = new();
                        } 
                        //removet image
                        if(existingItinerary.Images != null && existingItinerary.Images.Count > 0 && (itinerary.Images == null ||itinerary.Images.Count == 0 ) )
                        {
                            existingItinerary.Images = new();
                        }
                        //if (existingItinerary.Images[0].Id != itinerary.Images[0].Id)
                        //{

                        //}

                    }
                }

                var itinerariesToAdd = updateItineraries.Where(i => i.Id == 0)
                    .Select(i => new Itinerary
                    {
                        TourId = i.TourId,
                        Content = i.Content,
                        Title = i.Title,
                        TimeTravel = i.TimeTravel,
                        Images = null
                    })
                    .ToList();
                if(itinerariesToAdd.Any())
                tour.Itineraries.AddRange(itinerariesToAdd);
                context.Entry(tour).State = EntityState.Modified;
                if(await context.SaveChangesAsync() > 0)
                {
                    transaction.Commit();
                }
            }catch(Exception ex)
            {
                transaction.Rollback();
                throw new Exception(ex.Message);
            }

            //public string Title { get; set; }
            //public string Departure { get; set; }
            //public List<string> Utilities { get; set; } = new();
            //public List<string>? TopPlaces { get; set; } = new();
            //public required string Description { get; set; }
            //public decimal PriceAdult { get; set; }
            //public decimal PriceChild { get; set; }
            //public string Duration { get; set; }
            //public string? Destination { get; set; }
            //public string? Transport { get; set; }
            //public ICollection<TourWithType> TourWithType { get; set; } = [];
        }
    }
}
