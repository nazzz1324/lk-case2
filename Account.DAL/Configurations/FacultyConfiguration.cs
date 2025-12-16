using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class FacultyConfiguration : IEntityTypeConfiguration<Faculty>
    {
        public void Configure(EntityTypeBuilder<Faculty> builder)
        {
            builder.Property(f => f.Id).ValueGeneratedOnAdd();
            builder.Property(f => f.Name).IsRequired().HasMaxLength(200);

            builder.HasMany(f => f.Groups)
                .WithOne(g => g.Faculty)
                .HasForeignKey(g => g.FacultyId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}