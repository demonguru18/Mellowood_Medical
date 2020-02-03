using System.ComponentModel.DataAnnotations;

namespace MellowoodMedical.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}