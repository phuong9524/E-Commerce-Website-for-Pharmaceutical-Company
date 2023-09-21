using Medicine.Domain.Dto.UserDto;

namespace Medicine.Domain.Dto.OrderDto
{
    public class OrderDetailResponse : OrderResponseViewRequestDto
    {
        public string Description { get; set; }

        public string Destination { get; set; }

        public string PaymentMethod { get; set; }

        public UserResponseDto User { get; set; }

        public IList<OrderProduct> Product { get; set; }
    }

    public class OrderProduct
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public int Quantity { get; set; }

        public int Price { get; set; }

        public bool CanComment { get; set; }

        public IList<string> Images { get; set; }
    }
}
