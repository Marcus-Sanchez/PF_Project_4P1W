using System;
using System.Collections.Generic;

namespace resource_api.Models
{
    public class Puzzle
    {
        public int Id { get; set; }

        public int PackId { get; set; }

        public string AnswerWord { get; set; } = string.Empty;

        public string Hint { get; set; } = string.Empty;

        public string Difficulty { get; set; } = "Easy";

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Pack? Pack { get; set; }

        public List<PuzzleImage> PuzzleImages { get; set; } = new();
    }
}