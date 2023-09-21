using Medicine.Domain.Dto.OrderDto;
using Medicine.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Medicine.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : BaseController
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        //[Authorize(Roles = "Admin")]
        //[HttpPost("confirm-order")]
        //public IActionResult ConfirmOrder([FromBody] Guid orderId)
        //{
        //    var id = _orderService.ConfirmOrder(orderId, ContextDto);

        //    return Created(HttpContext.Request.Path, new { Id = id });
        //}

        [Authorize]
        [HttpGet("view-orders")]
        public IActionResult ViewOrder([FromQuery] ViewUserOrdersRequestDto viewUserOrdersRequest)
        {
            var result = _orderService.ViewOrders(viewUserOrdersRequest, ContextDto);

            return Ok(result);
        }

        //[Authorize(Roles = "Admin")]
        //[HttpPost("deliver-order")]
        //public IActionResult DeliverOrder([FromBody] Guid orderId, Guid shipperId)
        //{
        //    var id = _orderService.UpdateStatusOrder(orderId, shipperId, ContextDto);

        //    return Created(HttpContext.Request.Path, new { Id = id });
        //}

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetOrderDetail(Guid id)
        {
            var result = _orderService.GetOrderDetail(id, ContextDto);

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("update-status")]
        public IActionResult UpdateStatus([FromBody] OrderUpdateStatusRequestDto orderUpdateStatusRequestDto)
        {
            var id = _orderService.UpdateStatusOrder(orderUpdateStatusRequestDto);

            return Created(HttpContext.Request.Path, new { Id = id });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("statuses")]
        public IActionResult GetStatuses()
        {
            var result = _orderService.GetStatuses();

            return Ok(result);
        }

        [Authorize]
        [HttpPost("cancel-order-by-user")]
        public IActionResult CancelOrder([FromQuery] Guid id)
        {
            var result = _orderService.CancelOrder(id);

            return Ok(result);
        }
    }
}
