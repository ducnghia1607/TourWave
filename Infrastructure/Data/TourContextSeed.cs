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
         if(!context.TourWithTypes.Any()){
            var tourWithTypesData =  await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/tourwithtype.json");
            var tourWithTypes = JsonSerializer.Deserialize<List<TourWithType>>(tourWithTypesData);
            if(tourWithTypes == null) return;
            context.TourWithTypes.AddRange(tourWithTypes);
            await context.SaveChangesAsync();
        }

        if(!context.Departures.Any()){
            var departureData =  await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/departurelocation.json");
            var departures = JsonSerializer.Deserialize<List<Departure>>(departureData);
            if(departures == null) return;
            context.Departures.AddRange(departures);
            await context.SaveChangesAsync();
        }
     }
}
