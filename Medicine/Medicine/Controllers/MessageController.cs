using Medicine.Domain.Dto.MessageDto;
using Medicine.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Medicine.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : BaseController
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [Authorize]
        [HttpPost("send-message")]
        public IActionResult SendMessage([FromBody] SendMessageDto sendMessageDto)
        {
            sendMessageDto.SenderId = ContextDto.UserId;
            var id = _messageService.SendMessage(sendMessageDto);

            return Created(HttpContext.Request.Path, new { Id = id });
        }

        [Authorize]
        [HttpPost("get-messages")]
        public IActionResult GetMessage([FromBody] GetMessageDto getMessageDto)
        {
            getMessageDto.SenderId = ContextDto.UserId;
            var result = _messageService.GetMessage(getMessageDto);

            return Ok(result);
        }
    }
}
