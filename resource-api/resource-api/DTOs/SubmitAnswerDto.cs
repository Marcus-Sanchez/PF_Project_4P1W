namespace resource_api.DTOs
{
    public class SubmitAnswerDto
    {
        public int PuzzleId { get; set; }

        public string Guess { get; set; } = string.Empty;
    }
}