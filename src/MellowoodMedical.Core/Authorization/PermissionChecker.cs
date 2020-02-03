using Abp.Authorization;
using MellowoodMedical.Authorization.Roles;
using MellowoodMedical.Authorization.Users;

namespace MellowoodMedical.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
