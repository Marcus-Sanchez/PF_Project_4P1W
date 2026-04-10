using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resource_api.Data;
using resource_api.DTOs;

namespace resource_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PuzzlesController : ControllerBase
    {
        private readonly ResourceDbContext _context;

        public PuzzlesController(ResourceDbContext context)
        {
            _context = context;
        }

        [HttpGet("next")]
        public async Task<IActionResult> GetNextPuzzle([FromQuery] int packId)
        {
            var puzzles = await _context.Puzzles
                .Include(p => p.PuzzleImages)
                .Where(p => p.PackId == packId && p.IsActive)
                .ToListAsync();

            if (!puzzles.Any())
            {
                return NotFound(new { message = "No puzzles found for this pack." });
            }

            var randomPuzzle = puzzles.OrderBy(x => Guid.NewGuid()).First();

            var result = new PuzzleDto
            {
                Id = randomPuzzle.Id,
                Hint = randomPuzzle.Hint,
                Difficulty = randomPuzzle.Difficulty,
                Images = randomPuzzle.PuzzleImages.Select(pi => pi.ImageUrl).ToList()
            };

            return Ok(result);
        }
    }
}