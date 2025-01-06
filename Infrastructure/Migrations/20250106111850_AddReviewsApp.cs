using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddReviewsApp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_AspNetUsers_AppUserId2",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_AppUserId2",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "AppUserId2",
                table: "Bookings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppUserId2",
                table: "Bookings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_AppUserId2",
                table: "Bookings",
                column: "AppUserId2");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_AspNetUsers_AppUserId2",
                table: "Bookings",
                column: "AppUserId2",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
