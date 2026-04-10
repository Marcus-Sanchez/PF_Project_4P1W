using System.Collections.Generic;

namespace resource_api.DTOs
{
    public class PuzzleDto
    {
        public int Id { get; set; }

        public string Hint { get; set; } = string.Empty;

        public string Difficulty { get; set; } = string.Empty;

        public List<string> Images { get; set; } = new();
    }
}