using Medicine.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Medicine.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductTypeController : BaseController
    {
        private readonly IProductTypeService _productTypeService;

        public ProductTypeController(IProductTypeService productTypeService)
        {
            _productTypeService = productTypeService;
        }

        [HttpGet]
        public IActionResult GetProductTypes()
        {
            var result = _productTypeService.GetProductTypes();

            return Ok(result);
        }
    }
}
