using Medicine.Domain.Dto.ProductDto;
using Medicine.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Medicine.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : BaseController
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public IActionResult GetProducts([FromBody] ProductRequestDto paginationRequestDto)
        {
            var result = _productService.GetProducts(paginationRequestDto);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(Guid id)
        {
            var result = _productService.GetProduct(id);

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("create-product")]
        public IActionResult CreateProduct([FromBody] ProductCreateDto createProductDto)
        {
            var id = _productService.CreateProduct(createProductDto);

            return Created(HttpContext.Request.Path, new { Id = id });
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("{id}")]
        public IActionResult UpdateProduct(Guid id, [FromBody] ProductUpdateDto updateProductDto)
        {
            updateProductDto.Id = id;
            var result = _productService.UpdateProduct(updateProductDto);

            return Created(HttpContext.Request.Path, new { Id = result });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(Guid id)
        {
            _productService.DeleteProduct(id);

            return NoContent();
        }
    }
}
