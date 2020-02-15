using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;

namespace MellowoodMedical.Pages.Dto
{
    public class PageTemplateDto : EntityDto<int>
    {
        [Required]
        [MaxLength(100)]
        [Display(Name = "Page Title")]
        public string Title { get; set; }   
        
        [Required]
        [MaxLength(100)]
        [Display(Name = "Page Description")]
        public string Description { get; set; } 
        
        [Required]
        [Display(Name = "Page Content")]
        public string PageContent { get; set; }
        
        [Display(Name = "Active")]
        public bool IsActive { get; set; } 
        
    }
}