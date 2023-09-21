namespace Medicine.Domain.Dto.CommentDto
{
    public class CommentRequestDto : BasePaginationRequestDto
    {
        public Guid ProductId { get; set; }
    }
}
