using AssetManagementSystem.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagementSystem.Api.Configuration
{
    public class PermissionManagerConfiguration: IEntityTypeConfiguration<PermissionManager>
    {
        public void Configure(EntityTypeBuilder<PermissionManager> entity)
        {
            // テーブル名を設定
            entity.ToTable("PermissionManager");

            // Idを主キーとして設定
            entity.HasKey(key => new { key.PermissionId, key.AccountId });

            entity.Property(a => a.PermissionId)
                  .ValueGeneratedNever()
                  .HasColumnName("権限ID");

            // 権限名は入力必須
            entity.Property(a => a.AccountId)
                      .IsRequired()
                      .HasColumnName("アカウントID");

            entity.HasOne(pm => pm.Permissions)
                              .WithMany(p => p.PermissionManager)
                              .HasForeignKey(pm => pm.PermissionId);

            entity.HasOne(pm => pm.Accounts)
                              .WithMany(a => a.PermissionManager)
                              .HasForeignKey(pm => pm.AccountId);

        }
    }
}
