using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class ReviewConfiguration : IEntityTypeConfiguration<Review>
    {
        public void Configure(EntityTypeBuilder<Review> builder)
        {
            builder.HasMany(r => r.Images).WithOne(i => i.Review).HasForeignKey(i => i.ReviewId).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(r => r.Tour).WithMany(t => t.Reviews).HasForeignKey(r => r.TourId).IsRequired().OnDelete(DeleteBehavior.NoAction);

        //       modelBuilder.Entity<Review>()
        // .HasMany(x => x.Images)
        // .WithOne(x => x.Review)
        // .HasForeignKey(t => t.ReviewId)
        // .IsRequired(false)
        // .OnDelete(DeleteBehavior.Cascade);

        }
    }
}