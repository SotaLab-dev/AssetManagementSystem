namespace AssetManagementSystem.Api.Entities
{
    public class Permissions
    {
        public int PermissionId { get; set; }

        public string PermissionName { get; set; } = string.Empty;

        public List<PermissionManager> PermissionManager { get; set; } = new();
    }
}
