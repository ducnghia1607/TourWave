
using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class TourContext(DbContextOptions options) : DbContext(options)
{

    public DbSet<Image> Images { get; set; }
    public DbSet<TourType> TourTypes { get; set; }
    public DbSet<Tour> Tours { get; set; }
    public DbSet<TourWithType> TourWithTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // modelBuilder.ApplyConfigurationsFromAssembly(typeof(Tour).Assembly);
         modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

    }
}
