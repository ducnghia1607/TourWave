using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Config;

public class TourWithTypeConfiguration : IEntityTypeConfiguration<TourWithType>
{
    public void Configure(EntityTypeBuilder<TourWithType> builder)
    {
        builder.HasKey(x => new {x.TourId,x.TourTypeId});
    }
}

