namespace AssetManagementSystem.Api.Models
{
    public enum AssetStatus
    {
        InUse,
        OnLoan,
        Broken
    }
    public static class AssetStatusExtensions
    {
        public static string ToDisplayString(this AssetStatus status) => status switch
        {
            AssetStatus.InUse => "利用中",
            AssetStatus.OnLoan => "貸出中",
            AssetStatus.Broken => "故障中",
            _ => status.ToString()
        };
    }

    public enum AssetCategory
    {
        PC,
        Monitor,
        Smartphone

    }
    public static class AssetCategoryExtensions
    {
        public static string ToDisplayString(this AssetCategory status) => status switch
        {
            AssetCategory.PC => "PC",
            AssetCategory.Monitor => "モニター",
            AssetCategory.Smartphone => "スマートフォン",
            _ => status.ToString()
        };
    }

}
