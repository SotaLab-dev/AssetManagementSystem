using AssetManagementSystem.Api.Models;
using AssetManagementSystem.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagementSystem.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]

    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginModel model)
        {
            if (model.Password == "admin")
            {
                var token = TokenService.GenerateToken(
                    _configuration["Jwt:Key"],
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    model.UserName
                    );

                Response.Cookies.Append("token", token, new CookieOptions 
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddHours(1)
                });

                return Ok();
            }
            return Unauthorized();
        }
    }
}
