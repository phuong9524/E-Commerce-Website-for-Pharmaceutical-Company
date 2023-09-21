namespace Medicine.Domain.Dto.CartDto
{
    public class CartConfirmDto
    {
        public IList<CartInfo> CartInfos { get; set; }

        public string PaymentMethod { get; set; }

        public string Description { get; set; }

        public string Destination { get; set; }
    }

    public class CartInfo
    {
        public Guid Id { get; set; }

        public int Price { get; set; }
    }
}
