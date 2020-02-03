using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace MellowoodMedical.EntityFrameworkCore
{
    public static class MellowoodMedicalDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<MellowoodMedicalDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<MellowoodMedicalDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
