using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class CompetenceConfiguration : IEntityTypeConfiguration<Competence>
    {
        public void Configure(EntityTypeBuilder<Competence> builder)
        {
            builder.Property(c => c.Id); 

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(c => c.Description)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(c => c.proleId)
                .IsRequired();

            builder.HasOne(c => c.ProfessionalRole)
                .WithMany(pr => pr.Competences) 
                .HasForeignKey(c => c.proleId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasMany(c => c.Indicators)
                .WithOne(i => i.Competence)
                .HasForeignKey(i => i.CompetenceId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(c => c.CompetenceScore)
                .WithOne(cs => cs.Competence)
                .HasForeignKey<CompetenceScore>(cs => cs.CompetenceId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}


