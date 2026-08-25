using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagementSystem.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    備品名 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    カテゴリ = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ステータス = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    管理番号 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    購入日 = table.Column<DateOnly>(type: "DATE", nullable: true),
                    備考 = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assets");
        }
    }
}
