using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MellowoodMedical.Configuration;

namespace MellowoodMedical.Web.Host.Startup
{
    [DependsOn(
       typeof(MellowoodMedicalWebCoreModule))]
    public class MellowoodMedicalWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public MellowoodMedicalWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MellowoodMedicalWebHostModule).GetAssembly());
        }
    }
}
