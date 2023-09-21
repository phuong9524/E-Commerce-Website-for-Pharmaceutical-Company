namespace Medicine.Domain.Dto.CartDto
{
    public class CartResponseDto
    {
        public Guid Id { get; set; }

        public Guid ProductId { get; set; }

        public string ProductName { get; set; }

        public int Quantity { get; set; }

        public int Price { get; set; }

        public List<string> Images { get; set; }

        public string Status { get; set; }
    }
}
