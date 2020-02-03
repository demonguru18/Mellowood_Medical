using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using MellowoodMedical.Configuration;
using MellowoodMedical.Web;

namespace MellowoodMedical.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class MellowoodMedicalDbContextFactory : IDesignTimeDbContextFactory<MellowoodMedicalDbContext>
    {
        public MellowoodMedicalDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MellowoodMedicalDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            MellowoodMedicalDbContextConfigurer.Configure(builder, configuration.GetConnectionString(MellowoodMedicalConsts.ConnectionStringName));

            return new MellowoodMedicalDbContext(builder.Options);
        }
    }
}
