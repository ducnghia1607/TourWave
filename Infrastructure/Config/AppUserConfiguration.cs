using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Config
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            // builder.HasMany(x => x.Reviews).WithOne(x => x.AppUser).HasForeignKey(x => x.AppUserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            // builder.HasMany(x => x.UserConsulting).WithOne(x => x.AppUser).HasForeignKey(x => x.AppUserId).IsRequired(false).OnDelete(DeleteBehavior.Cascade);
            // builder.HasOne(x => x.Image).WithOne(x => x.AppUser).IsRequired(false).OnDelete(DeleteBehavior.Cascade);
            // builder.HasMany(x => x.Bookings).WithOne(x => x.AppUser).HasForeignKey(x => x.AppUserId).IsRequired(false).OnDelete(DeleteBehavior.Cascade);


        }
    }
}
