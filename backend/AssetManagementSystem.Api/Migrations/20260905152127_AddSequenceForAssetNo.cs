using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagementSystem.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSequenceForAssetNo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateSequence(
                name: "Seq_AssetNo",
                schema: "dbo",
                startValue: 1L,
                incrementBy:1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropSequence(
                name: "Seq_AssetNo",
                schema: "dbo");
        }
    }
}
