
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class TourConfiguration : IEntityTypeConfiguration<Tour>
{
    public void Configure(EntityTypeBuilder<Tour> builder)
    {
        builder.Property(x => x.PriceAdult).HasColumnType("decimal(18,2)");
        builder.Property(x => x.PriceChild).HasColumnType("decimal(18,2)");
        builder.Property(x => x.Title).IsRequired();
        builder.Property(x => x.Description).IsRequired();
        builder.HasMany(t => t.Images).WithOne(i => i.Tour).HasForeignKey(i => i.TourId).IsRequired(false).OnDelete(DeleteBehavior.Cascade);
        //builder.HasMany(t => t.Itineraries).WithOne(i => i.Tour).HasForeignKey(i => i.TourId).IsRequired(true).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(t => t.Reviews).WithOne(c => c.Tour).HasForeignKey(c => c.TourId).IsRequired(true).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(t => t.Schedules).WithOne(s => s.Tour).HasForeignKey(s => s.TourId).IsRequired(true).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(t => t.Consultings).WithOne(c => c.Tour).HasForeignKey(c => c.TourId).IsRequired(true).OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(t => t.Bookings).WithOne(b => b.Tour).HasForeignKey(b => b.TourId).IsRequired(true).OnDelete(DeleteBehavior.Cascade);


        // Tour With Type  builder.HasMany(t => t.Bookings).WithOne(b => b.Tour).HasForeignKey(b => b.TourId).IsRequired(true).OnDelete(DeleteBehavior.Cascade);
        //Không cần confiure lắm(Default:BehaviorCascade.Delete : nếu một thực thể ở một trong hai bên của mối quan hệ bị xóa, thì các hàng trong bảng liên kết cho thực thể đó sẽ tự động bị xóa.

    }
}
