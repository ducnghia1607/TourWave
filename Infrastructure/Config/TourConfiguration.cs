
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
    }
}
