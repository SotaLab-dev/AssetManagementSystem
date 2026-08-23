using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AssetManagementSystem.Api.Entities;

namespace AssetManagementSystem.Api.Configuration
{
    public class AssetConfiguration : IEntityTypeConfiguration<Asset>
    {
        public void Configure(EntityTypeBuilder<Asset> entity)
        {
            // テーブル名を設定
            entity.ToTable("Assets");

            // Idを主キーとして設定
            entity.HasKey(key => key.Id);
            entity.Property(a => a.Id)
                  .ValueGeneratedNever()
                  .HasColumnName("ID");

            // 備品名は入力必須
            entity.Property(a => a.AssetName)
                  .IsRequired()
                  .HasMaxLength(50)
                  .HasColumnName("備品名");


            entity.Property(a => a.Category)
                  .IsRequired()
                  .HasMaxLength(50)
                  .HasColumnName("カテゴリ");

            entity.Property(a => a.Status)
                  .IsRequired()
                  .HasMaxLength(20)
                  .HasColumnName("ステータス");

            entity.Property(a => a.ManagementNumber)
                  .IsRequired()
                  .HasMaxLength(30)
                  .HasColumnName("管理番号");

            entity.Property(a => a.PurchaseDate)
                  .HasColumnType("DATE")
                  .HasColumnName("購入日");

            entity.Property(a => a.Remarks)
                  .IsRequired()
                  .HasMaxLength(200)
                  .HasColumnName("備考");

        }
    }
}
