using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class StudentConfiguration : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.Fullname).IsRequired().HasMaxLength(200);
            builder.Property(s => s.DateOfBirth).IsRequired();
            builder.Property(s => s.EnrollmentYear).IsRequired();

            builder.HasOne(s => s.User)
                .WithOne(u => u.Student)
                .HasForeignKey<Student>(s => s.Id)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(s => s.Group)
                .WithMany(g => g.Students)
                .HasForeignKey(s => s.Id)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasMany(s => s.IndicatorScores)
                .WithOne(si => si.Student)
                .HasForeignKey(si => si.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasMany(s => s.DisciplineScores)
                .WithOne(ds => ds.Student)
                .HasForeignKey(ds => ds.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasMany(s => s.CompetenceScores)
                .WithOne(cs => cs.Student)
                .HasForeignKey(cs => cs.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}