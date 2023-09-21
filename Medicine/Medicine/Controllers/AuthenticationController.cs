using Medicine.Domain.Dto.UserDto;
using Medicine.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Medicine.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthenticationController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Login(LoginRequestDto loginRequest)
        {
            var result = _userService.Login(loginRequest);

            return Ok(result);
        }
    }
}
