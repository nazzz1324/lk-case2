using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.Property(g => g.Id).ValueGeneratedOnAdd().IsRequired();//
            builder.Property(g => g.Name).IsRequired().HasMaxLength(10);//
            builder.Property(g => g.ProleId).IsRequired();//

            //builder.HasOne(g => g.EducationForm)
            //    .WithMany(f => f.Groups)
            //    .HasForeignKey(g => g.EducationFormId)
            //    .OnDelete(DeleteBehavior.ClientSetNull); 

            //builder.HasOne(g => g.Faculty)
            //    .WithMany(f => f.Groups)
            //    .HasForeignKey(g => g.FacultyId)
            //    .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasMany(g => g.Students)
                .WithOne(s => s.Group);//

            builder.HasMany(g => g.Disciplines)
                .WithMany(d => d.Groups);//
            
            builder.HasOne(g => g.ProfessionalRole)
                .WithMany(pr => pr.Groups)
                .HasForeignKey(g => g.ProleId)
                .OnDelete(DeleteBehavior.ClientSetNull);//
        }
    }
}