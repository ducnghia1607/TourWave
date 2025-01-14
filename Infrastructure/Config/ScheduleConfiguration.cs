using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Config
{
    internal class ScheduleConfiguration : IEntityTypeConfiguration<Schedule>
    {
        public void Configure(EntityTypeBuilder<Schedule> builder)
        {
            builder.HasMany(s => s.Bookings).WithOne(s => s.Schedule).IsRequired(false).OnDelete(DeleteBehavior.Restrict);
            builder.Property(s => s.PriceAdult).HasColumnType("decimal(18,2)");
            builder.Property(s => s.PriceChild).HasColumnType("decimal(18,2)");
        }
    }
}
