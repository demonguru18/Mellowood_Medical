using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace MellowoodMedical.Controllers
{
    public abstract class MellowoodMedicalControllerBase: AbpController
    {
        protected MellowoodMedicalControllerBase()
        {
            LocalizationSourceName = MellowoodMedicalConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
