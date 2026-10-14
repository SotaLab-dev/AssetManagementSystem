namespace AssetManagementSystem.Api.Models
{
    public class AccountEditModel
    {
        public string UserId { get; set; } = string.Empty;
        public string AccountName { get; set; } = string.Empty;

        public string CurrentPassword { get; set; } = string.Empty;

        public string NewPassword { get; set; } = string.Empty;
    }
}
