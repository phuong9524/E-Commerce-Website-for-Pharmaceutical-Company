using Medicine.DataAccess.Extension;
using Medicine.Domain.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Medicine.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected ContextDto ContextDto => new ContextDto()
        {
            UserEmail = HttpContext.GetUserEmail(),
            UserId = HttpContext.GetUserId(),
            UserRoles = HttpContext.GetUserRoles(),
            UserName = HttpContext.GetUserName(),
            UserFullName = HttpContext.GetUserFullName(),
        };
    }
}
