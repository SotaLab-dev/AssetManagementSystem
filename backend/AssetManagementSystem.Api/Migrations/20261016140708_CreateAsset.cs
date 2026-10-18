using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagementSystem.Api.Migrations
{
    /// <inheritdoc />
    public partial class CreateAsset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    権限ID = table.Column<int>(type: "int", nullable: false),
                    権限名 = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.権限ID);
                });

            migrationBuilder.CreateTable(
                name: "PermissionManager",
                columns: table => new
                {
                    権限ID = table.Column<int>(type: "int", nullable: false),
                    アカウントID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionManager", x => new { x.権限ID, x.アカウントID });
                    table.ForeignKey(
                        name: "FK_PermissionManager_Accounts_アカウントID",
                        column: x => x.アカウントID,
                        principalTable: "Accounts",
                        principalColumn: "アカウントID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PermissionManager_Permissions_権限ID",
                        column: x => x.権限ID,
                        principalTable: "Permissions",
                        principalColumn: "権限ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PermissionManager_アカウントID",
                table: "PermissionManager",
                column: "アカウントID");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_権限名",
                table: "Permissions",
                column: "権限名",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PermissionManager");

            migrationBuilder.DropTable(
                name: "Permissions");
        }
    }
}
