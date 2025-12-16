using Account.Domain.Entity;
using Account.Domain.Entity.LinkedEntites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class IndicatorConfiguration : IEntityTypeConfiguration<Indicator>
    {
        public void Configure(EntityTypeBuilder<Indicator> builder)
        {
            builder.Property(i => i.Id);
            builder.Property(i => i.Name).IsRequired();
            builder.Property(i => i.Description).HasMaxLength(500);
            builder.Property(i => i.DisciplineId).IsRequired();
            builder.Property(i => i.CompetenceId).IsRequired();

            builder.HasOne(i => i.Discipline)
                .WithMany(d => d.Indicators)
                .HasForeignKey(i => i.DisciplineId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(i => i.Competence)
                .WithMany(c => c.Indicators)
                .HasForeignKey(i => i.CompetenceId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(i => i.IndicatorScore)
                .WithOne(s => s.Indicator)
                .HasForeignKey<IndicatorScore>(i => i.IndicatorId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}