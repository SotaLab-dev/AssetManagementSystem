using AssetManagementSystem.Api.Interfaces;

namespace AssetManagementSystem.Api.Services
{
    public class BCryptPasswordService : IPasswordService
    {
        // セキュリティ優先のため、workFactorを「12」（標準より高負荷・高安全）に設定
        private const int WorkFactor = 12;

        // パスワードをハッシュ化
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, WorkFactor);
        }

        // ハッシュ化されたパスワードと入力されたパスワードを比較して検証
        public bool VerifyPassword(string? password, string? hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}
