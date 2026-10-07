using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagementSystem.Api.Migrations
{
    /// <inheritdoc />
    public partial class UsersAndAccounts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ユーザーID = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    ユーザー名 = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    パスワード = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    作成日時 = table.Column<string>(type: "nvarchar(19)", maxLength: 19, nullable: true),
                    更新日時 = table.Column<string>(type: "nvarchar(19)", maxLength: 19, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ユーザーID);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    アカウントID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ユーザーID = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    アカウント名 = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    パスワード = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    作成日時 = table.Column<string>(type: "nvarchar(19)", maxLength: 19, nullable: true),
                    更新日時 = table.Column<string>(type: "nvarchar(19)", maxLength: 19, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.アカウントID);
                    table.ForeignKey(
                        name: "FK_Accounts_Users_ユーザーID",
                        column: x => x.ユーザーID,
                        principalTable: "Users",
                        principalColumn: "ユーザーID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_ユーザーID_アカウント名",
                table: "Accounts",
                columns: new[] { "ユーザーID", "アカウント名" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_ユーザー名",
                table: "Users",
                column: "ユーザー名",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
