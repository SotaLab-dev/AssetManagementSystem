using AssetManagementSystem.Api.Data;
using AssetManagementSystem.Api.DTO;
using AssetManagementSystem.Api.Entities;
using AssetManagementSystem.Api.Interfaces;
using AssetManagementSystem.Api.Models;
using AssetManagementSystem.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (string.IsNullOrWhiteSpace(model.UserId) ||
                string.IsNullOrWhiteSpace(model.AccountName) ||
                string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest();
            }

            if (model.UserId.Length > 20 ||
                model.AccountName.Length > 20)
            {
                return BadRequest();
            }

            var account = await _authContext.Accounts.FirstOrDefaultAsync(a => a.UserId == model.UserId && a.AccountName == model.AccountName);

            if (account?.AccountName == null)
            {
                return Unauthorized();
            }

            if (account?.Password == null)
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

            if (model.AccountName.Length > 20)
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest();
            }

            if (model.Password.Length < 8 || model.Password.Length > 64)
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

        [Authorize]
        [HttpGet("account/{accountId}")]
        public async Task<IActionResult> GetUserId(Guid accountId)
        {
            var accountInfo = await _authContext.Accounts
                                     .Where(a => a.AccountId == accountId)
                                     .Select(a => new AccountInfoDTO
                                     {
                                         UserId = a.UserId,
                                         AccountName = a.AccountName
                                     })
                                     .FirstOrDefaultAsync();

            if(accountInfo == null)
            {
                return NotFound();
            }

            return Ok(accountInfo);
        }

        [Authorize]
        [HttpGet("accounts")]
        public async Task<IActionResult> GetAccountsAsync()
        {
            var accounts = await _authContext.Accounts
                                       .Select(a => new AccountDTO
                                       {
                                           AccountId = a.AccountId,
                                           UserId = a.UserId,
                                           AccountName = a.AccountName
                                       })
                                       .ToListAsync();

            return Ok(accounts);
        }


        [Authorize]
        [HttpPut("edit/{accountId}")]
        public async Task<IActionResult> Edit(Guid accountId, [FromBody] AccountEditModel model)
        {
            if (string.IsNullOrWhiteSpace(model.AccountName))
            {
                return BadRequest();
            }

            if (model.AccountName.Length > 20)
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(model.CurrentPassword))
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(model.NewPassword))
            {
                return BadRequest();
            }

            if (model.NewPassword.Length < 8 || model.NewPassword.Length > 64)
            {
                return BadRequest();
            }

            var account = await _authContext.Accounts.FirstOrDefaultAsync(a => a.AccountId == accountId);

            if (account == null)
            {
                return NotFound();
            }

            if(account.AccountName != model.AccountName)
            {
                var isExistAccountName = await _authContext.Accounts.AnyAsync(a =>
                                            a.UserId == model.UserId &&
                                            a.AccountName == model.AccountName &&
                                            a.AccountId != accountId
                                            );
                if (isExistAccountName)
                {
                    return BadRequest();
                }

            }

            bool passwordVerify = _passwordService.VerifyPassword(model.CurrentPassword, account.Password);

            if (!passwordVerify)
            {
                return BadRequest();
            }

            string passwordHash = _passwordService.HashPassword(model.NewPassword);

            account.AccountName = model.AccountName;
            account.Password = passwordHash;
            account.UpdatedAt = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss"); ;

            await _authContext.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
        [HttpDelete("delete/{accountId}")]
        public async Task<IActionResult> Delete(Guid accountId)
        {
            var account = await _authContext.Accounts
                                              .FirstOrDefaultAsync(a => a.AccountId == accountId);

            if (account == null)
            {
                return NotFound();
            }

            _authContext.Accounts.Remove(account);
            await _authContext.SaveChangesAsync();

            return NoContent();
        }
    }
}