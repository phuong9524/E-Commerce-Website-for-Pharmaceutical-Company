namespace Medicine.Domain.Dto.ProductDto
{
    public class ProductResponseDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Price { get; set; }

        public int Quantity { get; set; }

        public List<string> Images { get; set; }

        public string Type { get; set; }
    }
}
