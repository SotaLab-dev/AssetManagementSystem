using AssetManagementSystem.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagementSystem.Api.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<Users>
    {
        public void Configure(EntityTypeBuilder<Users> entity)
        {
            // テーブル名を設定
            entity.ToTable("Users");

            // Idを主キーとして設定
            entity.HasKey(key => key.UserId);
            entity.Property(a => a.UserId)
                  .ValueGeneratedNever()
                  .HasMaxLength(20)
                  .HasColumnName("ユーザーID");

            // 備品名は入力必須
            entity.Property(a => a.UserName)
                      .IsRequired()
                      .HasMaxLength(20)
                      .HasColumnName("ユーザー名");

            entity.HasIndex(a => a.UserName)
                  .IsUnique();

            entity.Property(a => a.Password)
                      .IsRequired()
                      .HasMaxLength(255)
                      .HasColumnName("パスワード");

            entity.Property(a => a.CreatedAt)
                      .HasMaxLength(19)
                      .HasColumnName("作成日時");

            entity.Property(a => a.UpdatedAt)
                      .HasMaxLength(19)
                      .HasColumnName("更新日時");
        }
    }
}
