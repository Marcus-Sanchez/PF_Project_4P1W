using System;
using System.Collections.Generic;

namespace resource_api.Models
{
    public class Pack
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public bool IsPublished { get; set; } = false;

        public int SortOrder { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Puzzle> Puzzles { get; set; } = new();
    }
}