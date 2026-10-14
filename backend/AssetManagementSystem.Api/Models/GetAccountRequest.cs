namespace AssetManagementSystem.Api.Models
{
    public class GetAccountRequest
    {
        public Guid AccountId { get; set; }

        public string UserId { get; set; } = string.Empty;

        public string AccountName { get; set; } = string.Empty;    }
}
