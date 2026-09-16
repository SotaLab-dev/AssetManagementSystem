namespace AssetManagementSystem.Api.Models
{
    public class BulkUpdateStatusRequest
    {
        public Guid[] Ids { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}
