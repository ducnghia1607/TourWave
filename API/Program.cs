using API.Errors;
using API.Extensions;
using API.Middlewares;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddServices(builder.Configuration);

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
//app.UseCors(x => x.AllowAnyHeader().AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));
//app.UseCors(x => x.AllowAnyHeader().AllowAnyHeader().AllowAnyOrigin());
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
try
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<TourContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    await context.Database.MigrateAsync();
    await TourContextSeed.SeedAsync(context,userManager, roleManager);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    throw;
}
app.Run();
