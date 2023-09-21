namespace Medicine.Domain.Dto.NewsfeedDto
{
    public class NewsfeedDetailDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string Image { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
