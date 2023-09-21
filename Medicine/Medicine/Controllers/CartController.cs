using Medicine.Domain.Dto;
using Medicine.Domain.Dto.CartDto;
using Medicine.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Medicine.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : BaseController
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetMyCarts([FromQuery] BasePaginationRequestDto paginationRequestDto)
        {
            var result = _cartService.GetMyCarts(paginationRequestDto, ContextDto);

            return Ok(result);
        }

        [Authorize]
        [HttpPost("add-product")]
        public IActionResult AddProduct([FromBody] CartAddingProductDto cartAddingProduct)
        {
            var id = _cartService.AddProduct(cartAddingProduct, ContextDto);

            return Created(HttpContext.Request.Path, new { Id = id });
        }

        [Authorize]
        [HttpPost("modify-product")]
        public IActionResult ModifyCart([FromBody] CartModificationDto cartModification)
        {
            var result = _cartService.ModifyCart(cartModification, ContextDto);

            return Ok(result);
        }

        [Authorize]
        [HttpDelete]
        public IActionResult DeleteCart([FromQuery] Guid cartId)
        {
            _cartService.DeleteCart(cartId, ContextDto);

            return NoContent();
        }

        [Authorize]
        [HttpPost("confirm-cart")]
        public IActionResult ConfirmCart([FromBody] CartConfirmDto cartConfirm)
        {
            var id = _cartService.ConfirmCart(cartConfirm, ContextDto);

            return Created(HttpContext.Request.Path, new { Id = id });
        }
    }
}
