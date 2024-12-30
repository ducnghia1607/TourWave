
using System.Reflection;
using System.Text.Json;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Infrastructure.Data;

public class TourContext  : IdentityDbContext<AppUser, AppRole, int,IdentityUserClaim<int>, AppUserRole,
IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public TourContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Image> Images { get; set; }
    public DbSet<TourType> TourTypes { get; set; }
    public DbSet<Tour> Tours { get; set; }
    public DbSet<TourWithType> TourWithTypes { get; set; }
    public DbSet<Itinerary> Itinerarys { get; set; }
    public DbSet<Schedule> Schedules { get; set; }
    public DbSet<Departure> Departures { get; set; }
    public DbSet<UserPhoto> UserPhotos { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // modelBuilder.ApplyConfigurationsFromAssembly(typeof(Tour).Assembly);
        modelBuilder.Entity<AppUser>()
        .HasMany(u => u.UserRoles)
        .WithOne(au => au.User)
        .HasForeignKey(u => u.UserId)
        .IsRequired();

        modelBuilder.Entity<AppRole>()
        .HasMany(r => r.UserRoles)
        .WithOne(au => au.Role)
        .HasForeignKey(u => u.RoleId)
        .IsRequired();
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

    }
}
