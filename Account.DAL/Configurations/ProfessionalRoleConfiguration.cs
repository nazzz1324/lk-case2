using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class ProfessionalRoleConfiguration : IEntityTypeConfiguration<ProfessionalRole>
    {
        public void Configure(EntityTypeBuilder<ProfessionalRole> builder)
        {
            builder.Property(p => p.Id).ValueGeneratedOnAdd();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(200);
            builder.Property(p => p.Description).IsRequired().HasMaxLength(1000);

            builder.HasMany(p => p.Competences)
                .WithOne(c => c.ProfessionalRole)
                .HasForeignKey(c => c.proleId)
                .OnDelete(DeleteBehavior.ClientSetNull);

        }
    }
}