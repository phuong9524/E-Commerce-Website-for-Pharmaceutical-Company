using Medicine.Domain.Dto.NewsfeedDto;
using Medicine.Domain.Dto.ProductDto;
using Medicine.Domain.Services;
using Medicine.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Medicine.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsfeedController : BaseController
    {
        private readonly INewsfeedService _newsfeedService;

        public NewsfeedController(INewsfeedService newsfeedService)
        {
            _newsfeedService = newsfeedService;
        }

        [HttpGet]
        public IActionResult GetDetail([FromQuery] NewsfeedRequestDto newsfeedRequestDto)
        {
            var result = _newsfeedService.GetNewsfeeds(newsfeedRequestDto);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetDetail(Guid id)
        {
            var result = _newsfeedService.GetDetail(id);

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult CreateNewsfeed([FromBody] NewsfeedCreateDto newsfeedCreateDto)
        {
            newsfeedCreateDto.UserId = ContextDto.UserId;
            var id = _newsfeedService.CreateNewsfeed(newsfeedCreateDto);

            return Created(HttpContext.Request.Path, new { Id = id });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public IActionResult DeleteNewsfeed([FromQuery] Guid id)
        {
            _newsfeedService.DeleteNewsfeed(id);

            return NoContent();
        }
    }
}
