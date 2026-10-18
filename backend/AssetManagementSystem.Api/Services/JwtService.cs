using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace AssetManagementSystem.Api.Services
{
    public class JwtService
    {
        private readonly TokenValidationParameters _validationParams;

        public JwtService(TokenValidationParameters validationParams)
        {
            _validationParams = validationParams;
        }

        public string ValidateAndGetUserId(string token)
        {
            var handler = new JwtSecurityTokenHandler();

            var principal = handler.ValidateToken(token, _validationParams, out var validatedToken);

            var userId = principal.FindFirstValue("userId");

            var accountName = principal.FindFirstValue("accountName");

            if (userId == null)
            {
                throw new SecurityTokenException("UserId not found in token");
            }

            if(accountName == null)
            {
                throw new SecurityTokenException("AccountName not found in token");
            }

            return userId;
        }
    }
}
