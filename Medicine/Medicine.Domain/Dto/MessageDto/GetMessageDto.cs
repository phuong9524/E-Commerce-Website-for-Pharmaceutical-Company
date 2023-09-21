using System.Text.Json.Serialization;

namespace Medicine.Domain.Dto.MessageDto
{
    public class GetMessageDto
    {
        [JsonIgnore]
        public Guid SenderId { get; set; }

        public Guid ReceiverId { get; set; }

        public int NumberOfSkips { get; set; }
    }
}
