using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.Property(x => x.PricePerAdult).HasColumnType("decimal(18,2)");
            builder.Property(x => x.PricePerChild).HasColumnType("decimal(18,2)");

                // builder    .HasOne(b => b.Tour)
                //     .WithMany(t => t.Bookings)
                //     .HasForeignKey(b => b.TourId)
                //     .OnDelete(DeleteBehavior.NoAction);

                // builder    .HasOne(b => b.Schedule)
                //     .WithMany(s => s.Bookings)
                //     .HasForeignKey(b => b.ScheduleId)
                //     .OnDelete(DeleteBehavior.NoAction);

                builder    .HasOne(b => b.AppUser)
                    .WithMany(s => s.Bookings)
                    .HasForeignKey(b => b.AppUserId)
                    .OnDelete(DeleteBehavior.NoAction);
                    
                    // builder.HasOne(b => b.Tour).WithMany(t => t.Bookings).HasForeignKey(b => b.TourId).IsRequired().OnDelete(DeleteBehavior.NoAction);
        }
    }
}