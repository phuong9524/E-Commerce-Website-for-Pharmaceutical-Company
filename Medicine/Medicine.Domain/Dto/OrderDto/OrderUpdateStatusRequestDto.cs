using Medicine.Domain.Enums;

namespace Medicine.Domain.Dto.OrderDto
{
    public class OrderUpdateStatusRequestDto
    {
        public Guid Id { get; set; }

        public OrderStatuses OrderStatuses { get; set; }

        public string CancelReason { get; set; }
    }
}
