using System.Text.Json.Serialization;

namespace Medicine.Domain.Dto.NewsfeedDto
{
    public class NewsfeedCreateDto
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public string Image { get; set; }

        [JsonIgnore]
        public Guid UserId { get; set; }
    }
}
