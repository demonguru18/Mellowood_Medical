using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MellowoodMedical.Roles.Dto;
using MellowoodMedical.Users.Dto;

namespace MellowoodMedical.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
