using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MellowoodMedical.EntityFrameworkCore;
using MellowoodMedical.Pages.Dto;
using MellowoodMedical.Products.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace MellowoodMedical.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProductController  : MellowoodMedicalControllerBase
    {
        private readonly MellowoodMedicalDbContext _context;
        
        public ProductController(MellowoodMedicalDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var result = await _context.Products.ToListAsync();

                if (result != null)
                {
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
            return BadRequest();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById([FromRoute] int id)
        {
            try
            {
                var result = await _context.Products.FindAsync(id);

                if (result != null)
                {
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] ProductDto formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new JsonResult("Error"));
            }

            try
            {
                var newProduct = new ProductDto
                {
                    Name = formData.Name,
                    ImageUrl = formData.ImageUrl,
                    Description = formData.Description,
                    OutOfStock = formData.OutOfStock,
                    Price = formData.Price,
                    Ratings = formData.Ratings
                };
                await _context.Products.AddAsync(newProduct);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(new JsonResult("Error"));
            }
            return Ok(new JsonResult("Success"));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductDto formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new JsonResult("Error"));
            }

            try
            {
                var findProduct = await _context.Products.FindAsync(formData.Id);
                
                if (findProduct == null)
                {
                    return NotFound(new JsonResult("Id Not found"));
                }

                findProduct.Name = formData.Name;
                findProduct.Description = formData.Description;
                findProduct.Price = formData.Price;
                findProduct.ImageUrl = formData.ImageUrl;
                findProduct.OutOfStock = formData.OutOfStock;
                findProduct.Ratings = formData.Ratings;

                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try

                    {
                        _context.Entry(findProduct).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                    }
                    
                    dbContextTransaction.Commit();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(new JsonResult("Error"));
            }
            return new JsonResult("Success");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new JsonResult("Error"));
            }

            try
            {
                var findProduct = await _context.Products.FindAsync(id);
            
                if (findProduct == null)
                {
                    return NotFound(new JsonResult("Id Not found"));
                }
            
                _context.Products.Remove(findProduct);
            
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(new JsonResult("Error"));
            }
            return new JsonResult("Success");
        }
        
        /*Pages*/
        [HttpPost]
        public async Task<IActionResult> AddPage([FromBody] dynamic formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(string.Join(",",
                    ModelState.Values.Where(E => E.Errors.Count > 0)
                        .SelectMany(e => e.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToArray()));
            }

            try
            {
                var pageData = formData.ToObject<Dictionary<string, object>>();
                
                var pageDto = new PageTemplateDto();
                pageDto.Description = pageData["title"];
                pageDto.Title = pageData["description"];
                pageDto.IsActive = false;
                pageDto.PageContent = pageData["pageContent"];;
                await _context.Pages.AddAsync(pageDto);
                await _context.SaveChangesAsync();
                return Ok(new JsonResult("Success"));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            
            return BadRequest(new JsonResult("Error"));
        }

    }
}