//using Medicine.Domain.Dto.ShipperDto;
//using Medicine.Domain.Services;
//using Medicine.Domain.Services.Interfaces;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;

//namespace Medicine.API.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class ShipperController : BaseController
//    {
//        private readonly IShipperService _shipperService;

//        public ShipperController(IShipperService shipperService)
//        {
//            _shipperService = shipperService;
//        }

//        [Authorize(Roles = "Shipper")]
//        [HttpGet("all-orders")]
//        public IActionResult GetAllOrders([FromQuery] ShipperRequestOrderDto shipperRequestOrderDto)
//        {
//            shipperRequestOrderDto.ShipperId = ContextDto.UserId;
//            var result = _shipperService.GetAllOrders(shipperRequestOrderDto);

//            return Ok(result);
//        }

//        [Authorize(Roles = "Shipper")]
//        [HttpGet("orders-by-status")]
//        public IActionResult GetOrdersByStatus([FromQuery] ShipperRequestOrderDto shipperRequestOrderDto)
//        {
//            shipperRequestOrderDto.ShipperId = ContextDto.UserId;
//            var result = _shipperService.GetOrdersByStatus(shipperRequestOrderDto);

//            return Ok(result);
//        }

//        [Authorize(Roles = "Shipper")]
//        [HttpGet("update-status")]
//        public IActionResult UpdateStatus([FromQuery] UpdateStatusOrderDto updateStatusOrderDto)
//        {
//            updateStatusOrderDto.ShipperId = ContextDto.UserId;
//            var result = _shipperService.UpdateStatusOrder(updateStatusOrderDto);

//            return Ok(result);
//        }
//    }
//}
