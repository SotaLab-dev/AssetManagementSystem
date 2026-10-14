namespace AssetManagementSystem.Api.DTO
{
    public class AccountDTO
    {
        public Guid AccountId { get; set; }

        public string UserId { get; set; } = string.Empty;

        public string AccountName { get; set; } = string.Empty;
    }
}

