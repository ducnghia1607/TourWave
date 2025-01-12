using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class ImageConfiguration : IEntityTypeConfiguration<Image>

    {
        public void Configure(EntityTypeBuilder<Image> builder)
        {
                    // Thiết lập quan hệ giữa Tour và Image

        // Thiết lập quan hệ giữa Itinerary và Image
        builder
            .HasOne(i => i.Itinerary)
            .WithMany(t => t.Images)
            .HasForeignKey(i => i.ItineraryId)
            .OnDelete(DeleteBehavior.NoAction);
           
        }
    }
}