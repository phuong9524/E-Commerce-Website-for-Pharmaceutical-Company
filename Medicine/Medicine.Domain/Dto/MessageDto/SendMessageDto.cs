namespace Medicine.Domain.Dto.MessageDto
{
    public class SendMessageDto
    {
        public Guid SenderId { get; set; }

        public Guid ReceiverId { get; set; }

        public string Content { get; set; }
    }
}
