using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MellowoodMedical.Configuration;
using MellowoodMedical.EntityFrameworkCore;
using MellowoodMedical.Migrator.DependencyInjection;

namespace MellowoodMedical.Migrator
{
    [DependsOn(typeof(MellowoodMedicalEntityFrameworkModule))]
    public class MellowoodMedicalMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public MellowoodMedicalMigratorModule(MellowoodMedicalEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(MellowoodMedicalMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                MellowoodMedicalConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MellowoodMedicalMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
