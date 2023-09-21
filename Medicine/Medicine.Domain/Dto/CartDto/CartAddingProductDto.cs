namespace Medicine.Domain.Dto.CartDto
{
    public class CartAddingProductDto
    {
        public Guid ProductId { get; set; }

        public int Quantity { get; set; }
    }
}
