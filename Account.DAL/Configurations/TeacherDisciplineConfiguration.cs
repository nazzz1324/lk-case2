using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class TeacherDisciplineConfiguration : IEntityTypeConfiguration<TeacherDiscipline>
    {
        public void Configure(EntityTypeBuilder<TeacherDiscipline> builder)
        {
            builder.HasKey(td => new { td.TeacherId, td.DisciplineId });

        }
    }
}