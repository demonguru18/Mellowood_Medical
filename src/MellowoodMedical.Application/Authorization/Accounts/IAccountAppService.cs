using System.Threading.Tasks;
using Abp.Application.Services;
using MellowoodMedical.Authorization.Accounts.Dto;

namespace MellowoodMedical.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
