namespace AssetManagementSystem.Api.Models
{
    public class AccountCreateModel
    {
        public string UserId { get; set; } = string.Empty;

        public string AccountName { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}
