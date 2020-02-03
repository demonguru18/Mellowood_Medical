using System.Collections.Generic;
using System.Linq.Dynamic.Core;
using MellowoodMedical.Products.Dto;
using Microsoft.EntityFrameworkCore;

namespace MellowoodMedical.EntityFrameworkCore.Seed.Products
{
    public class DefaultProductBuilder
    {
        private readonly MellowoodMedicalDbContext _context;
        
        public DefaultProductBuilder(MellowoodMedicalDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateDefaultProducts();
        }

        private void CreateDefaultProducts()
        {
            var products = _context.Products.IgnoreQueryFilters().FirstOrDefault();

            if (products == null)
            {
                _context.Products.AddRangeAsync(new List<ProductDto>
                {
                    new ProductDto { Name = "Walker with Wheels", Description = "Release Adjustable Lightweight Standard Walker with Wheels", Price = 9 , ImageUrl = "assets/images/Walker.jpg", Ratings = 5, OutOfStock = false},
                    new ProductDto { Name = "Shower Chair", Description = "Quick Release Shower Chair with Back", Price = 9 , ImageUrl = "assets/images/Release_Shower_Chair.jpg", Ratings = 5, OutOfStock = true},
                    new ProductDto { Name = "Over bed Table", Description = "This over-bed table is the perfect solution for someone who is unable to get out of bed for meals", Price = 9 , ImageUrl = "assets/images/OverbedTable.jpg", Ratings = 5, OutOfStock = true},
                    new ProductDto { Name = "Diagnostic Otoscope", Description = "Primacare Mini Diagnostic Otoscope Led, Black", Price = 9 , ImageUrl = "assets/images/Diagnostic_Otoscope.jpg", Ratings = 5, OutOfStock = false},
                    new ProductDto { Name = "Dental Tools Set", Description = "Dental Tools Set Teeth Whitening Cleaning Floss Scaler Tweezers Mirror Tarter Plaque Remover Oral Care Kit (5 Pcs)", Price = 9 , ImageUrl = "assets/images/Dental_Tools_Set.jpg", Ratings = 5, OutOfStock = false}
                });
            }
             
        }
    }
}