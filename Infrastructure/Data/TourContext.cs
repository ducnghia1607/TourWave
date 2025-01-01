
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
    public DbSet<TourHobby> TourHobbies { get; set; }
    public DbSet<TourTypeHobby> TourTypeHobbies { get; set; }
    public DbSet<Consulting> Consultings { get; set; }
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

        modelBuilder.Entity<TourTypeHobby>().Property(p => p.Appropriate).HasPrecision(18, 2);

        // modelBuilder.Entity<TourTypeHobby>()
        // .HasKey(l => new { l.TourHobbyId, l.TourTypeId });

        //  modelBuilder.Entity<TourTypeHobby>()
        // .HasOne(l => l.TourType)
        // .WithMany(u => u.TourTypeHobby)
        // .HasForeignKey(l => l.TourTypeId)
        // .OnDelete(DeleteBehavior.NoAction);

        // modelBuilder.Entity<TourTypeHobby>()
        // .HasOne(l => l.TourHobby)
        // .WithMany(u => u.TourTypeHobby)
        // .HasForeignKey(l => l.TourHobbyId)
        // .OnDelete(DeleteBehavior.NoAction);
        
        // modelBuilder.Entity<TourWithType>()
        // .HasKey(l => new { l.TourId, l.TourTypeId });

                 modelBuilder.Entity<TourWithType>()
        .HasOne(l => l.TourType)
        .WithMany(u => u.TourWithType)
        .HasForeignKey(l => l.TourTypeId)
        .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<TourWithType>()
        .HasOne(l => l.Tour)
        .WithMany(u => u.TourWithType)
        .HasForeignKey(l => l.TourId)
        .OnDelete(DeleteBehavior.NoAction);


        // 1 nguoi co the duoc nhieu nguoi like 

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

    }
}
