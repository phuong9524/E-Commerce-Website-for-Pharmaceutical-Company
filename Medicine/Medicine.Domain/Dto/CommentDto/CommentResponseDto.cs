using Medicine.Domain.Dto.ProductDto;
using Medicine.Domain.Enums;

namespace Medicine.Domain.Dto.CommentDto
{
    public class CommentResponseDto
    {
        public CommentUser User { get; set; }

        public Guid Id { get; set; }

        public string Content { get; set; }

        public IList<string> Images { get; set; }

        public DateTime CreatedAt { get; set; }

        public float Points { get; set; }

        public string Mood { get; set; }

        public ProductResponseDto Product { get; set; }
    }

    public class CommentUser
    {
        public Guid Id { get; set; }

        public string Avatar { get; set; }

        public string FullName { get; set; }
    }
}
