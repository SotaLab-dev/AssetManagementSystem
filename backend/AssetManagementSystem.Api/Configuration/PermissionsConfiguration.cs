using AssetManagementSystem.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagementSystem.Api.Configuration
{
    public class PermissionsConfiguration : IEntityTypeConfiguration<Permissions>
    {
        public void Configure(EntityTypeBuilder<Permissions> entity)
        {
            // テーブル名を設定
            entity.ToTable("Permissions");

            // Idを主キーとして設定
            entity.HasKey(key => key.PermissionId);

            entity.Property(a => a.PermissionId)
                  .ValueGeneratedNever()
                  .HasColumnName("権限ID");

            // 権限名は入力必須
            entity.Property(a => a.PermissionName)
                  .IsRequired()
                  .HasMaxLength(20)
                  .HasColumnName("権限名");

            entity.HasIndex(a => a.PermissionName)
                  .IsUnique();
        }
    }
}

