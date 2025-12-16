using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.Property(g => g.Id).ValueGeneratedOnAdd();
            builder.Property(g => g.CourseId).IsRequired();
            builder.Property(g => g.FacultyId).IsRequired();
            builder.Property(g => g.StudentId).IsRequired();

            builder.HasOne(g => g.EducationForm)
                .WithMany(f => f.Groups)
                .HasForeignKey(g => g.EducationFormId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(g => g.Faculty)
                .WithMany(f => f.Groups)
                .HasForeignKey(g => g.FacultyId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(g => g.Course)
                .WithMany(c => c.Groups)
                .HasForeignKey(g => g.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasMany(g => g.Students)
                .WithOne(s => s.Group)
                .HasForeignKey(s => s.Id)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasMany(g => g.Disciplines)
                .WithMany(d => d.Groups)
                .UsingEntity<GroupDiscipline>(
                l => l.HasOne<Discipline>().WithMany().HasForeignKey(x => x.DisciplineId),
                l => l.HasOne<Group>().WithMany().HasForeignKey(x => x.GroupId)
                );
        }
    }
}