using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class ItineraryConfiguration : IEntityTypeConfiguration<Itinerary>
    {
        public void Configure(EntityTypeBuilder<Itinerary> builder)
        {

            // builder.HasOne(i => i.Tour).WithMany(t => t.Itineraries).HasForeignKey(i => i.TourId).IsRequired().OnDelete(DeleteBehavior.NoAction);
            // builder.HasMany(i => i.Images).WithOne(x => x.Itinerary).HasForeignKey(i => i.ItineraryId).IsRequired(false).
            // OnDelete(DeleteBehavior.Restrict);


        }

            
    }
}