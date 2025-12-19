using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class StudentConfiguration : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.Property(s => s.Id).ValueGeneratedOnAdd().IsRequired();//
            builder.Property(s => s.Firstname).IsRequired().HasMaxLength(25);//
            builder.Property(s => s.Lastname).IsRequired().HasMaxLength(25);//
            builder.Property(s => s.Middlename).IsRequired().HasMaxLength(25);//
            builder.Property(s => s.GroupId).IsRequired();//
            //builder.Property(s => s.DateOfBirth).IsRequired();
            //builder.Property(s => s.EnrollmentYear).IsRequired();

            builder.HasOne(s => s.User)
                .WithOne(u => u.Student);//

            builder.HasOne(s => s.Group)
                .WithMany(g => g.Students)
                .HasForeignKey(s => s.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull);//

            builder.HasMany(s => s.IndicatorScores)
                .WithOne(si => si.Student);//

            builder.HasMany(s => s.DisciplineScores)
                .WithOne(ds => ds.Student);//

            builder.HasMany(s => s.CompetenceScores)
                .WithOne(cs => cs.Student);//
        }
    }
}