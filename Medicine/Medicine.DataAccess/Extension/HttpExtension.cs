using Microsoft.AspNetCore.Http;
namespace Medicine.DataAccess.Extension
{
    public static class HttpExtension
    {
        public static Guid GetUserId(this HttpContext httpContext)
        {
            return httpContext != null
                    ? Guid.TryParse(httpContext.User?.Claims?.FirstOrDefault(o => o.Type == "Id")?.Value, out var userId)
                        ? userId
                        : Guid.Empty
                    : Guid.Empty;
        }

        public static string GetUserEmail(this HttpContext httpContext)
        {
            return httpContext.User.Claims.FirstOrDefault(o => o.Type == "Email")?.Value ?? string.Empty;
        }

        public static string GetUserName(this HttpContext httpContext)
        {
            return httpContext.User.Claims.FirstOrDefault(o => o.Type == "UserName")?.Value ?? string.Empty;
        }

        public static string GetUserFullName(this HttpContext httpContext)
        {
            return httpContext.User.Claims.FirstOrDefault(o => o.Type == "FullName")?.Value ?? string.Empty;
        }

        public static IList<string> GetUserRoles(this HttpContext httpContext)
        {
            var value = httpContext?.User?.Claims?.FirstOrDefault(o => o.Type == "Roles")?.Value;

            return string.IsNullOrEmpty(value)
                    ? new List<string>()
                    : value.Split(",");
        }
    }
}
