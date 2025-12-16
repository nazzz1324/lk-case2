using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class GroupDisciplineConfiguration : IEntityTypeConfiguration<GroupDiscipline>
    {
        public void Configure(EntityTypeBuilder<GroupDiscipline> builder)
        {
            builder.HasKey(gd => new { gd.GroupId, gd.DisciplineId });
        }
    }
}