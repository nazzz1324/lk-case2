using Account.Domain.Entity.AuthRole;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Account.DAL.Configurations.AuthRole
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
    {
        void IEntityTypeConfiguration<UserRole>.Configure(EntityTypeBuilder<UserRole> builder)
        {
            
        }
    }
}
