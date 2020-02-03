using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MellowoodMedical.Authorization;

namespace MellowoodMedical
{
    [DependsOn(
        typeof(MellowoodMedicalCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class MellowoodMedicalApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<MellowoodMedicalAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(MellowoodMedicalApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
