using Medicine.Domain.Dto.ColorDto;
using Medicine.Domain.Dto.ProductDto;
using Medicine.Domain.Dto.UserDto;

namespace Medicine.Domain.Dto.OrderDto
{
    public class OrderResponseViewRequestDto
    {
        public Guid Id { get; set; }

        public string Description { get; set; }

        public UserResponseDto User { get; set; }

        public List<ProductResponseDto> Products { get; set; }

        public List<OrderStatusResponse> Statuses { get; set; }

        public int Sum { get; set; }
    }

    public class OrderStatusResponse
    {
        public Guid Id { get; set; }

        public ColorResponseDto Status { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
