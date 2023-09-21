using System.Text.Json.Serialization;

namespace Medicine.Domain.Dto.CommentDto
{
    public class SendCommentDto
    {
        [JsonIgnore]
        public Guid UserId { get; set; }

        public Guid ProductId { get; set; }

        public string Content { get; set; }

        public float Points { get; set; }

        public List<string> Images { get; set; }
    }
}
