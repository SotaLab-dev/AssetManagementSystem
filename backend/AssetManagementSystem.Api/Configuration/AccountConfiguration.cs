using AssetManagementSystem.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagementSystem.Api.Configuration
{
    public class AccountConfiguration : IEntityTypeConfiguration<Accounts>
    {
        public void Configure(EntityTypeBuilder<Accounts> entity)
        {
            // テーブル名を設定
            entity.ToTable("Accounts");

            // Idを主キーとして設定
            entity.HasKey(key => key.AccountId);
            entity.Property(a => a.AccountId)
                      .ValueGeneratedNever()
                      .HasColumnName("アカウントID");

            entity.Property(a => a.UserId)
                      .IsRequired()
                      .HasMaxLength(20)
                      .HasColumnName("ユーザーID");

            entity.HasOne(a => a.User)
                      .WithMany(u => u.Accounts)
                      .HasForeignKey(a => a.UserId);

            // ユーザー名は入力必須
            entity.Property(a => a.AccountName)
                      .IsRequired()
                      .HasMaxLength(20)
                      .HasColumnName("アカウント名");

            entity.HasIndex(a => new { a.UserId, a.AccountName})
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
