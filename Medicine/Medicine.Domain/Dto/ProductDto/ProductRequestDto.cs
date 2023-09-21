using Medicine.Domain.Enums;

namespace Medicine.Domain.Dto.ProductDto
{
    public class ProductRequestDto : BasePaginationRequestDto
    {
        public string? Keyword { get; set; }

        public string? Type { get; set; }

        public ProductRequestTypes ProductRequestTypes { get; set; }

        public SortTypes Sort { get; set; }
    }
}
