using Account.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.Infrastructure.Persistence.Configurations
{
    public class CompetenceConfiguration : IEntityTypeConfiguration<Competence>
    {
        public void Configure(EntityTypeBuilder<Competence> builder)
        {
            builder.Property(c => c.Id).ValueGeneratedOnAdd().IsRequired();// 

            builder.Property(c => c.Index).IsRequired().HasMaxLength(10);//

            builder.Property(c => c.Name).IsRequired().HasMaxLength(200);//

            builder.Property(c => c.Description).HasMaxLength(500);//

            builder.HasMany(c => c.ProfessionalRoles)
                .WithMany(pr => pr.Competences)
                .UsingEntity<CompetenceProle>(
                l => l.HasOne<ProfessionalRole>().WithMany().HasForeignKey(x => x.ProleId),
                l => l.HasOne<Competence>().WithMany().HasForeignKey(x => x.CompetenceId)  //
                );

            builder.HasMany(c => c.Indicators)
                .WithOne(i => i.Competence);//
            
            builder.HasOne(c => c.CompetenceScore) 
                .WithOne(cs => cs.Competence);//
        }
    }
}


