using Account.Domain.Entity;
using Account.Domain.Entity.AuthRole;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Account.DAL.Configurations.AuthRole
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Login).IsRequired().HasMaxLength(30);
            builder.Property(x => x.Password).IsRequired();

            builder.HasMany(x => x.Roles)
                .WithMany(x => x.Users)
                .UsingEntity<UserRole>(
                l => l.HasOne<Role>().WithMany().HasForeignKey(x => x.RoleId),
                l => l.HasOne<User>().WithMany().HasForeignKey(x => x.UserId)
                );

            builder.HasOne(x => x.UserToken)
                .WithOne(x => x.User);

            builder.HasOne(u => u.Student)
                .WithOne(s => s.User)
                .HasForeignKey<Student>(t => t.Id)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(u => u.Teacher)
                .WithOne(t => t.User)
                .HasForeignKey<Teacher>(t => t.Id)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}


