using Medicine.Domain.Dto;
using Medicine.Domain.Dto.CommentDto;
using Medicine.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Medicine.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : BaseController
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public IActionResult GetComment([FromQuery] CommentRequestDto commentRequestDto)
        {
            var result = _commentService.GetComments(commentRequestDto);

            return Ok(result);
        }

        [HttpGet("all")]
        public IActionResult GetAllComments([FromQuery] BasePaginationRequestDto basePaginationRequestDto)
        {
            var result = _commentService.GetAllComments(basePaginationRequestDto);

            return Ok(result);
        }

        [HttpGet("average-points")]
        public IActionResult GetAveragePoints([FromQuery] Guid productId)
        {
            var result = _commentService.GetAveragePoints(productId);

            return Ok(result);
        }

        [HttpDelete]
        public IActionResult DeleteComment([FromQuery] Guid id)
        {
            _commentService.DeleteComment(id, ContextDto);

            return StatusCode(StatusCodes.Status204NoContent);
        }

        [HttpPost]
        public IActionResult SendComment([FromBody] SendCommentDto sendCommentDto)
        {
            sendCommentDto.UserId = ContextDto.UserId;
            var id = _commentService.SendComment(sendCommentDto);

            return Created(HttpContext.Request.Path, new { Id = id });
        }

        [HttpPatch]
        public IActionResult ModifyComment([FromBody] CommentModifyDto commentModifyDto)
        {
            commentModifyDto.UserId = ContextDto.UserId;
            var id = _commentService.ModifyComment(commentModifyDto);

            return Created(HttpContext.Request.Path, new { Id = id });
        }
    }
}
