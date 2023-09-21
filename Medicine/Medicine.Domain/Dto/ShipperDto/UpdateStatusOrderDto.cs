using Medicine.Domain.Enums;

namespace Medicine.Domain.Dto.ShipperDto
{
    public class UpdateStatusOrderDto
    {
        public Guid OrderId { get; set; }

        public Guid ShipperId { get; set; }

        public OrderStatuses Status { get; set; }

        public string Description { get; set; }
    }
}
