using Medicine.Domain.Dto;
using Medicine.Domain.Dto.OrderDto;

namespace Medicine.Domain.Services.Interfaces
{
    public interface IOrderService
    {
        //Guid ConfirmOrder(Guid orderId, ContextDto contextDto);

        //Guid UpdateStatusOrder(Guid orderId, Guid shipperId, ContextDto contextDto);

        OrderDetailResponse GetOrderDetail(Guid id, ContextDto contextDto);

        PaginationDto<OrderResponseViewRequestDto> ViewOrders(ViewUserOrdersRequestDto viewUserOrdersRequest, ContextDto contextDto);
        
        Guid UpdateStatusOrder(OrderUpdateStatusRequestDto orderUpdateStatusRequestDto);
        
        List<string> GetStatuses();

        Guid CancelOrder(Guid id);
    }
}