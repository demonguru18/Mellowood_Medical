using Abp.MultiTenancy;
using MellowoodMedical.Authorization.Users;

namespace MellowoodMedical.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {            
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}
