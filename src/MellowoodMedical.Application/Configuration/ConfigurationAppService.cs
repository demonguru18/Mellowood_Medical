using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using MellowoodMedical.Configuration.Dto;

namespace MellowoodMedical.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : MellowoodMedicalAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
