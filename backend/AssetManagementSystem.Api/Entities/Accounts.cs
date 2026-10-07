namespace AssetManagementSystem.Api.Entities
{
    public class Accounts
    {
        public Guid AccountId { get; set; }

        public string UserId { get; set; } = string.Empty;

        public string AccountName { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string? CreatedAt { get; set; }

        public string? UpdatedAt { get; set; }

        public Users? User { get; set; }
    }
}
