namespace Medicine.Domain.Dto.ProductDto
{
    public class ProductDetailDto : ProductResponseDto
    {
        public int Views { get; set; }

        public string UserObject { get; set; }

        public string UserGuide { get; set; }

        public string Storage { get; set; }

        public string Use { get; set; }

        public List<string> Materials { get; set; }
    }
}
