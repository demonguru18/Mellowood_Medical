using Abp.Application.Services.Dto;

namespace MellowoodMedical.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

