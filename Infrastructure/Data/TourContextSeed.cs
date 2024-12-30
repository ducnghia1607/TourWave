using System;
using System.Text.Json;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class TourContextSeed
{
     public static async Task SeedAsync(TourContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
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
        if (await userManager.Users.AnyAsync()) return;
        // var usersData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var usersData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/DataUserSeed.json");
        var users = JsonSerializer.Deserialize<List<AppUser>>(usersData); // This deserializes the json data to an object of whatever type we specify here. As the Json data properties match the format of our AppUser properties, it converts it correctly to a list of Appusers
        if (users == null) return;
        var roles = new List<AppRole> // Here we create a list which is expecting a list of AppRoles. We intialise the list and add 3 new AppRoles and assign values to there name properties
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"}
            };
        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }
        foreach(var user in users)
        {
            user.UserName = user.UserName.ToLower();

            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");
        }

        var admin = new AppUser // Here we are creating a new AppUser so that we can assign them to be an admin 
        {
            UserName = "admin",
            //Gender = " ",
            //DateOfBirth = DateOnly.FromDateTime(DateTime.UtcNow)
        };
        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
        await context.SaveChangesAsync();

    }
}
