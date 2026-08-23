namespace AssetManagementSystem.Api.Entities
{
    public class Asset
    {
        public Guid Id { get; set; }

        public string AssetName { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public string ManagementNumber { get; set; } = string.Empty;

        public DateOnly? PurchaseDate { get; set; }

        public string Remarks { get; set; } = string.Empty;
    }
}
