
using System.Reflection;
using System.Text.Json;
using Azure;
using Core.Entities;
using Infrastructure.Config;
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
    public DbSet<TourHobby> TourHobbies { get; set; }
    public DbSet<TourTypeHobby> TourTypeHobbies { get; set; }
    public DbSet<Consulting> Consultings { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Review> Reviews { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        //  modelBuilder.ApplyConfigurationsFromAssembly(typeof(BookingConfiguration).Assembly);
        // modelBuilder.ApplyConfigurationsFromAssembly(typeof(ScheduleConfiguration).Assembly);
        // modelBuilder.ApplyConfigurationsFromAssembly(typeof(TourConfiguration).Assembly);
        // modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppUserConfiguration).Assembly);
        // modelBuilder.ApplyConfigurationsFromAssembly(typeof(TourWithTypeConfiguration).Assembly);
        // modelBuilder.ApplyConfigurationsFromAssembly(typeof(Tour).Assembly);

        modelBuilder.Entity<TourTypeHobby>().Property(p => p.Appropriate).HasPrecision(18, 2);
        //modelBuilder.Entity<Booking>()
        //    .HasOne(b => b.AppUser)
        //    .WithMany()
        //    .HasForeignKey(b => b.AppUserId)
        //    .OnDelete(DeleteBehavior.Cascade);
        //modelBuilder.Entity<Booking>()
        //    .HasOne(b => b.Tour)
        //    .WithMany(t => t.Bookings)
        //    .HasForeignKey(b => b.TourId)
        //    .OnDelete(DeleteBehavior.NoAction);

        //modelBuilder.Entity<Booking>()
        //    .HasOne(b => b.Schedule)
        //    .WithMany(s => s.Bookings)
        //    .HasForeignKey(b => b.ScheduleId)
        //    .OnDelete(DeleteBehavior.Cascade);

        //modelBuilder.Entity<Booking>()
        //    .HasOne(b => b.AppUser)
        //    .WithMany()
        //    .HasForeignKey(b => b.AppUserId)
        //    .OnDelete(DeleteBehavior.Cascade);

        // Configure Tour




        // App User
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

        //modelBuilder.Entity<TourWithType>()
        //    .HasOne(x => x.Tour)
        //    .WithMany(y => y.TourWithType)
        //    .HasForeignKey(l => l.TourId);
        //modelBuilder.Entity<Tour>()
            modelBuilder.Entity<TourWithType>()
        .HasOne(l => l.TourType)
        .WithMany(u => u.TourWithType)
        .HasForeignKey(l => l.TourTypeId)
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TourWithType>()
        .HasOne(l => l.Tour)
        .WithMany(u => u.TourWithType)
        .HasForeignKey(l => l.TourId)
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());   
        // Bên tour type hobby không cần configure vì mình không dùng gì đến xóa và thêm mới 
        // 1 nguoi co the duoc nhieu nguoi like 

       

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.EnableSensitiveDataLogging();
}

}
