namespace resource_api.Models
{
    public class PuzzleImage
    {
        public int Id { get; set; }

        public int PuzzleId { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        public Puzzle? Puzzle { get; set; }
    }
}