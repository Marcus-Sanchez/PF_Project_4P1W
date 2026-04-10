namespace resource_api.DTOs
{
    public class SubmitAnswerResponseDto
    {
        public bool Correct { get; set; }

        public int ScoreDelta { get; set; }

        public bool NextAvailable { get; set; }

        public string Message { get; set; } = string.Empty;
    }
}