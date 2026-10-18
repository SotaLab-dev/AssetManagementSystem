namespace AssetManagementSystem.Api.Entities
{
    public class PermissionManager
    {
        public int PermissionId { get; set; }

        public Guid AccountId { get; set; }

        public Permissions? Permissions { get; set; }

        public Accounts? Accounts { get; set; }
    }
}
