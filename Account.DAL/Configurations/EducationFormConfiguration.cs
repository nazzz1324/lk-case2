using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class EducationFormConfiguration : IEntityTypeConfiguration<EducationForm>
    {
        public void Configure(EntityTypeBuilder<EducationForm> builder)
        {
            builder.Property(ef => ef.Id).ValueGeneratedOnAdd(); //
            builder.Property(ef => ef.Name).IsRequired().HasMaxLength(100); //

            builder.HasMany(ef => ef.Groups)
                .WithOne(g => g.EducationForm); //
        }
    }
}