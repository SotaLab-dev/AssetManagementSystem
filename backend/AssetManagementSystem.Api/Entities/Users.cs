namespace AssetManagementSystem.Api.Entities
{
    public class Users
    {
        public string UserId { get; set; } = string.Empty;

        public string UserName { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string? CreatedAt { get; set; }

        public string? UpdatedAt { get; set; }

        public List<Accounts> Accounts { get; set; } = new();
    }
}
