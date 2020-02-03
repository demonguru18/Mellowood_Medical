using System.Threading.Tasks;
using MellowoodMedical.Configuration.Dto;

namespace MellowoodMedical.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
