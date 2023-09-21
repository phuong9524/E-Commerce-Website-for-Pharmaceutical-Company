using Medicine.Domain.Dto.ManagementDto;
using Medicine.Domain.Dto.ShipperDto;
using Medicine.Domain.Services;
using Medicine.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Medicine.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManagementController : BaseController
    {
        private readonly IManagementService _managementService;

        public ManagementController(IManagementService managementService)
        {
            _managementService = managementService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("sales")]
        public IActionResult GetSales([FromQuery] SaleRequestDto saleRequestDto)
        {
            var result = _managementService.GetSales(saleRequestDto);

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("customers")]
        public IActionResult GetCustomers([FromQuery] CustomerRequestDto customerRequestDto)
        {
            var result = _managementService.GetCustomers(customerRequestDto);

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("employees")]
        public IActionResult GetEmployees([FromQuery] EmployeesRequestDto employeesRequestDto)
        {
            var result = _managementService.GetEmployees(employeesRequestDto);

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch]
        public IActionResult ModifyUser([FromBody] ModifyUserRequestDto modifyUserRequestDto)
        {
            _managementService.ModifyUser(modifyUserRequestDto);

            return Accepted();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("statistic-customers")]
        public IActionResult GetStatisticCustomers()
        {
            var result = _managementService.GetStatisticCustomers();

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("statistic-products")]
        public IActionResult GetStatisticProducts()
        {
            var result = _managementService.GetStatisticProducts();

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("statistic-orders")]
        public IActionResult GetStatisticOrders()
        {
            var result = _managementService.GetStatisticOrders();

            return Ok(result);
        }
    }
}
