namespace AssetManagementSystem.Api.Models
{
    public class AssetsResponse
    {
        public Guid Id { get; set; }

        public string AssetName { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public string ManagementNumber { get; set; } = string.Empty;

        public string? PurchaseDate { get; set; }

        public string Remarks { get; set; } = string.Empty;
    }
}
