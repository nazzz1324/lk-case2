using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class TeacherConfiguration : IEntityTypeConfiguration<Teacher>
    {
        public void Configure(EntityTypeBuilder<Teacher> builder)
        {
            builder.Property(t => t.Id).ValueGeneratedOnAdd();
            builder.Property(t => t.Fullname).IsRequired().HasMaxLength(200);
            builder.Property(t => t.DateOfBirth).IsRequired();
            builder.Property(t => t.AcademicDegree).HasMaxLength(100);

            builder.HasOne(t => t.User)
                .WithOne(u => u.Teacher )
                .HasForeignKey<Teacher>(t => t.Id)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasMany(t => t.IndicatorScores)
                .WithOne(si => si.Teacher)
                .HasForeignKey(si => si.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasMany(t => t.Disciplines)
                .WithMany(d => d.Teachers)
                .UsingEntity<TeacherDiscipline>(
                l => l.HasOne<Discipline>().WithMany().HasForeignKey(x => x.DisciplineId),
                l => l.HasOne<Teacher>().WithMany().HasForeignKey(x => x.TeacherId)
                );

        }
    }
}