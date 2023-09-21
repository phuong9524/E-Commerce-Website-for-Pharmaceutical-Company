using Medicine.Domain.Dto.UserDto;
using Medicine.Domain.Exceptions;
using Medicine.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Medicine.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetUsers()
        {
            var result = _userService.GetUsers();

            return Ok(result);
        }

        [Authorize]
        [HttpGet("info")]
        public IActionResult GetInfo([FromQuery] Guid id)
        {
            var result = _userService.GetInfo(id, ContextDto);

            if(result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-user")]
        public IActionResult AddUser([FromBody] CreateNewUserRequestDto addNewUser)
        {
            var id = _userService.CreateUser(addNewUser, ContextDto);

            return Created(HttpContext.Request.Path, new { Id = id });
        }

        [HttpPost("register-user")]
        public IActionResult RegisterUser([FromBody] CreateNewUserRequestDto createNewUser)
        {
            var id = _userService.RegisterUser(createNewUser);

            return Created(HttpContext.Request.Path, new { Id = id });
        }

        [Authorize]
        [HttpPatch("modify-info-user")]
        public IActionResult ModifyInfo([FromBody] UserModificationDto userModificationDto)
        {
            if(userModificationDto.Id != ContextDto.UserId)
            {
                return Forbid();
            }

            _userService.ModifyInfo(userModificationDto);

            return Ok();
        }

        [Authorize]
        [HttpPatch("change-password")]
        public IActionResult ChangePassword([FromBody] UserChangePasswordDto userChangePasswordDto)
        {
            if (userChangePasswordDto.Id != ContextDto.UserId)
            {
                return Forbid();
            }

            _userService.ChangePassword(userChangePasswordDto);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("roles")]
        public IActionResult GetRoles()
        {
            var result = _userService.GetRoles();

            return Ok(result);
        }
    }
}
