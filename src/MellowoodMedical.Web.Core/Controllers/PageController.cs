using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MellowoodMedical.EntityFrameworkCore;
using MellowoodMedical.Pages.Dto;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MellowoodMedical.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("localhost")]
    public class PageController : MellowoodMedicalControllerBase
    {
        private readonly MellowoodMedicalDbContext _context;
        
        public PageController(MellowoodMedicalDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllPages()
        {
            try
            {
                var result = await _context.Pages.ToListAsync();

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
        public async Task<IActionResult> GetPageById([FromRoute] int id)
        {
            try
            {
                var result = await _context.Pages.FindAsync(id);

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
        public async Task<IActionResult> GetPageContent([FromRoute] int id)
        {
            try
            {
                var result = await _context.Pages.FindAsync(id);

                if (result != null)
                {
                    return Ok(result.PageContent);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
            return BadRequest();
        }
        

        [HttpPost("{id}")]
        public async Task<IActionResult> GetMyPage([FromRoute] int id)
        {
            return Ok("Test");
        }

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
        
        [HttpPut]
        public async Task<IActionResult> UpdatePage([FromBody] dynamic formData)
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
                
                var findPage = await _context.Pages.FindAsync(Convert.ToInt32(pageData["id"]));
                
                if (findPage == null)
                {
                    return NotFound(new JsonResult("Id Not found"));
                }

                findPage.Title = pageData["title"];
                findPage.Description = pageData["description"];
                findPage.PageContent = pageData["pageContent"];
                findPage.IsActive = pageData["isActive"];

                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try

                    {
                        _context.Entry(findPage).State = EntityState.Modified;
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
        public async Task<IActionResult> DeletePage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new JsonResult("Error"));
            }

            try
            {
                var findPage = await _context.Pages.FindAsync(id);
            
                if (findPage == null)
                {
                    return NotFound(new JsonResult("Id Not found"));
                }
            
                _context.Pages.Remove(findPage);
            
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(new JsonResult("Error"));
            }
            return new JsonResult("Success");
        }
    }
}