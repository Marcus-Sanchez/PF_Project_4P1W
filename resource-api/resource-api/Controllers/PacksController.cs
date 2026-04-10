using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resource_api.Data;
using resource_api.DTOs;

namespace resource_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacksController : ControllerBase
    {
        private readonly ResourceDbContext _context;

        public PacksController(ResourceDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPacks([FromQuery] bool random = false)
        {
            var packsQuery = _context.Packs
                .Where(p => p.IsPublished)
                .Select(p => new PackDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description
                });

            var packs = await packsQuery.ToListAsync();

            if (random)
            {
                packs = packs.OrderBy(x => Guid.NewGuid()).ToList();
            }

            return Ok(packs);
        }
    }
}