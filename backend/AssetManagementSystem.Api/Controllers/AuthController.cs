using AssetManagementSystem.Api.Models;
using AssetManagementSystem.Api.Services;
using AssetManagementSystem.Api.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AssetManagementSystem.Api.Data;
using Microsoft.EntityFrameworkCore;
using AssetManagementSystem.Api.Interfaces;

namespace AssetManagementSystem.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]

    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;

        private readonly AppDbContext _authContext;

        private readonly IPasswordService _passwordService;


        public AuthController(
            IConfiguration configuration, 
            AppDbContext authDbContext,
            IPasswordService passwordService)
        {
            _configuration = configuration;
            _authContext = authDbContext;
            _passwordService = passwordService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            if (model.UserId == null ||  model.AccountName == null || model.Password == null)
            {
                return BadRequest();
            }

            var account = _authContext.Accounts.FirstOrDefault(a => a.UserId == model.UserId && a.AccountName == model.AccountName);

            if(account == null)
            {
                return Unauthorized();
            }

            bool passwordVerify = _passwordService.VerifyPassword(model.Password, account?.Password);

            if (!passwordVerify)
            {
                return Unauthorized();
            }

            var token = TokenService.GenerateToken(
                _configuration["Jwt:Key"],
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                model.AccountName
                );

            Response.Cookies.Append("token", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            });

            var csrfToken = Guid.NewGuid().ToString("N");

            Response.Cookies.Append("csrf_token", csrfToken, new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            });

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("token");
            Response.Cookies.Delete("csrf_token");

            return Ok();
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] AccountCreateModel model)
        {
            if (string.IsNullOrWhiteSpace(model.UserId))
            {
                return BadRequest();
            }

            if (model.UserId.Length > 20)
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(model.AccountName))
            {
                return BadRequest();
            }

            if(model.AccountName.Length > 20)
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest();
            }

            bool isUserExists = await _authContext.Users.AnyAsync(u => u.UserId == model.UserId);

            if (!isUserExists)
            {
                return NotFound();
            }

            bool isAccountNameDuplicate = await _authContext.Accounts.AnyAsync(a => a.UserId == model.UserId && a.AccountName == model.AccountName);

            if (isAccountNameDuplicate)
            {
                return BadRequest();
            }

            string passwordHash = _passwordService.HashPassword(model.Password);

            DateTime now = DateTime.Now;

            var formattedTime = now.ToString("yyyy/MM/dd HH:mm:ss");

            var account = new Accounts
            {
                AccountId = Guid.NewGuid(),
                UserId = model.UserId,
                AccountName = model.AccountName,
                Password = passwordHash,
                CreatedAt = formattedTime,
                UpdatedAt = formattedTime
            };

            _authContext.Accounts.Add(account);
            await _authContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status201Created);
        }
    }
}