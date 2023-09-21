using Medicine.Domain.Enums;

namespace Medicine.Domain.Dto.OrderDto
{
    public class ViewUserOrdersRequestDto : BasePaginationRequestDto
    {
        public Guid UserId { get; set; }

        public Guid OrderId { get; set; }

        public OrderStatuses Status { get; set; }

        public SortTypes SortTypes { get; set; }
    }
}
