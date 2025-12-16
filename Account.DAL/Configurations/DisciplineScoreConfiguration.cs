using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class DisciplineScoreConfiguration : IEntityTypeConfiguration<DisciplineScore>
    {
        public void Configure(EntityTypeBuilder<DisciplineScore> builder)
        {
            builder.Property(ds => ds.Id).ValueGeneratedOnAdd();
            builder.Property(ds => ds.Score).IsRequired();
            builder.Property(ds => ds.Semester).IsRequired();

            builder.HasOne(ds => ds.Student)
                .WithMany(s => s.DisciplineScores)
                .HasForeignKey(ds => ds.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(ds => ds.Discipline)
                .WithOne(d => d.DisciplineScore)
                .HasForeignKey<DisciplineScore>(ds => ds.DisciplineId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}