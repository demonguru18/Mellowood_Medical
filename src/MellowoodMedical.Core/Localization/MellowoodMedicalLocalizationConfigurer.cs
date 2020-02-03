using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace MellowoodMedical.Localization
{
    public static class MellowoodMedicalLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(MellowoodMedicalConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(MellowoodMedicalLocalizationConfigurer).GetAssembly(),
                        "MellowoodMedical.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
