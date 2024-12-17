using System;
using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data;

public class TourContextSeed
{
     public static async Task SeedAsync(TourContext context){
        if(!context.Tours.Any()){
            var toursData =  await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/tours.json");
            var tours = JsonSerializer.Deserialize<List<Tour>>(toursData);
            if(tours == null) return;
            context.Tours.AddRange(tours);
            await context.SaveChangesAsync();
        }
        if(!context.TourTypes.Any()){
            var tourTypesData =  await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/tourtypes.json");
            var tourTypes = JsonSerializer.Deserialize<List<TourType>>(tourTypesData);
            if(tourTypes == null) return;
            context.TourTypes.AddRange(tourTypes);
            await context.SaveChangesAsync();
        }
     }
}
