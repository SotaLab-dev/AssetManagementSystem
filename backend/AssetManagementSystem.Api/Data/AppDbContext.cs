using AssetManagementSystem.Api.Configuration;
using AssetManagementSystem.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementSystem.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Asset> Assets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // IEntityTypeConfiguration<T>を実装した設定を自動的に適用する
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }

    }

}