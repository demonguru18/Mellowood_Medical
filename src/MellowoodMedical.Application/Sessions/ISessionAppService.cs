using System.Threading.Tasks;
using Abp.Application.Services;
using MellowoodMedical.Sessions.Dto;

namespace MellowoodMedical.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
