using Account.Domain.Entity;
using Account.Domain.Entity.AuthRole;
using Account.Domain.Entity.LinkedEntites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class DisciplineConfiguration : IEntityTypeConfiguration<Discipline>
    {
        public void Configure(EntityTypeBuilder<Discipline> builder)
        {
            builder.Property(d => d.Id).ValueGeneratedOnAdd().IsRequired();//
            builder.Property(d => d.Index).IsRequired().HasMaxLength(10);;//
            builder.Property(d => d.Name).IsRequired().HasMaxLength(200);//
            builder.Property(d => d.Description).HasMaxLength(500);//


            builder.HasMany(d => d.Indicators)
                .WithMany(i => i.Disciplines)
                .UsingEntity<IndicatorDiscipline>(
                l => l.HasOne<Indicator>().WithMany().HasForeignKey(x => x.IndicatorId),
                l => l.HasOne<Discipline>().WithMany().HasForeignKey(x => x.DisciplineId)//
                );
            builder.HasMany(d => d.Teachers)
                .WithMany(t => t.Disciplines)
                .UsingEntity<TeacherDiscipline>(
                l => l.HasOne<Teacher>().WithMany().HasForeignKey(x => x.TeacherId),
                l => l.HasOne<Discipline>().WithMany().HasForeignKey(x => x.DisciplineId)//
                );
            builder.HasMany(d => d.Groups)
                .WithMany(g => g.Disciplines)
                .UsingEntity<GroupDiscipline>(
                l => l.HasOne<Group>().WithMany().HasForeignKey(x => x.GroupId),
                l => l.HasOne<Discipline>().WithMany().HasForeignKey(x => x.DisciplineId)//
                );

            builder.HasOne(d => d.DisciplineScore) 
                .WithOne(ds => ds.Discipline);//
        }
    }
}