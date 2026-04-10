using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resource_api.Data;
using resource_api.DTOs;

namespace resource_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly ResourceDbContext _context;

        public GameController(ResourceDbContext context)
        {
            _context = context;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitAnswer([FromBody] SubmitAnswerDto request)
        {
            if (request == null || request.PuzzleId <= 0 || string.IsNullOrWhiteSpace(request.Guess))
            {
                return BadRequest(new SubmitAnswerResponseDto
                {
                    Correct = false,
                    ScoreDelta = 0,
                    NextAvailable = false,
                    Message = "Puzzle ID and guess are required."
                });
            }

            var puzzle = await _context.Puzzles.FirstOrDefaultAsync(p => p.Id == request.PuzzleId);

            if (puzzle == null)
            {
                return NotFound(new SubmitAnswerResponseDto
                {
                    Correct = false,
                    ScoreDelta = 0,
                    NextAvailable = false,
                    Message = "Puzzle not found."
                });
            }

            var normalizedGuess = NormalizeAnswer(request.Guess);
            var normalizedAnswer = NormalizeAnswer(puzzle.AnswerWord);

            var isCorrect = normalizedGuess == normalizedAnswer;

            return Ok(new SubmitAnswerResponseDto
            {
                Correct = isCorrect,
                ScoreDelta = isCorrect ? 10 : 0,
                NextAvailable = true,
                Message = isCorrect ? "Correct answer!" : "Wrong answer. Try again."
            });
        }

        private string NormalizeAnswer(string input)
        {
            return input
                .Trim()
                .ToLower()
                .Replace(" ", "")
                .Replace("-", "");
        }
    }
}