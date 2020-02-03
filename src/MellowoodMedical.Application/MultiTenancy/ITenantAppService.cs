using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MellowoodMedical.MultiTenancy.Dto;

namespace MellowoodMedical.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

