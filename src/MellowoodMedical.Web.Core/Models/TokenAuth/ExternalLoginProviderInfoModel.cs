using Abp.AutoMapper;
using MellowoodMedical.Authentication.External;

namespace MellowoodMedical.Models.TokenAuth
{
    [AutoMapFrom(typeof(ExternalLoginProviderInfo))]
    public class ExternalLoginProviderInfoModel
    {
        public string Name { get; set; }

        public string ClientId { get; set; }
    }
}
