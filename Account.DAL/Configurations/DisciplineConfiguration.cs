using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class DisciplineConfiguration : IEntityTypeConfiguration<Discipline>
    {
        public void Configure(EntityTypeBuilder<Discipline> builder)
        {
            builder.Property(d => d.Id).ValueGeneratedOnAdd();
            builder.Property(d => d.Name).IsRequired().HasMaxLength(200);
            builder.Property(d => d.Description).IsRequired().HasMaxLength(1000);

            builder.HasMany(d => d.Indicators)
                .WithOne(i => i.Discipline)
                .HasForeignKey(i => i.DisciplineId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(d => d.DisciplineScore)
                .WithOne(ds => ds.Discipline)
                .HasForeignKey<DisciplineScore>(ds => ds.DisciplineId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}