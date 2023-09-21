namespace Medicine.Domain.Dto.NewsfeedDto
{
    public class NewsfeedRequestDto : BasePaginationRequestDto
    {
        public string? Keyword { get; set; }
    }
}
