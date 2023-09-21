using Medicine.Domain.Enums;

namespace Medicine.Domain.Dto.ShipperDto
{
    public class ShipperRequestOrderDto : BasePaginationRequestDto
    {
        public Guid ShipperId { get; set; }

        public OrderStatuses Status { get; set; }
    }
}
