using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using MellowoodMedical.Authorization.Roles;
using MellowoodMedical.Authorization.Users;
using MellowoodMedical.MultiTenancy;
using MellowoodMedical.Products.Dto;

namespace MellowoodMedical.EntityFrameworkCore
{
    public class MellowoodMedicalDbContext : AbpZeroDbContext<Tenant, Role, User, MellowoodMedicalDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public virtual DbSet<ProductDto> Products { get; set; }
        public MellowoodMedicalDbContext(DbContextOptions<MellowoodMedicalDbContext> options)
            : base(options)
        {
        }
    }
}
