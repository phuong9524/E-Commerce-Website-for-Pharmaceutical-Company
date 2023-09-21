namespace Medicine.Domain.Dto.NewsfeedDto
{
    public class NewsfeedResponseDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Image { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
