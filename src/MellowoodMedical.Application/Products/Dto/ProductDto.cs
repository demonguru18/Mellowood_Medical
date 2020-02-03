using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;

namespace MellowoodMedical.Products.Dto
{
    public class ProductDto : EntityDto<int>
    {
         [Required]
         [StringLength(50)]
         public string Name { get; set; }
         
         [Required]
         [StringLength(200)]
         public string Description { get; set; }
         
         [Required]
         public string ImageUrl { get; set; }
         
         [Required]
         public decimal Price { get; set; }
         
         [Required]
         public bool OutOfStock { get; set; }
         
         public int Ratings { get; set; }
    }
}