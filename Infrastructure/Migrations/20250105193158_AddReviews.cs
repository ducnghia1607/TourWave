using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReviewId",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AppUserId2",
                table: "Bookings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    AppUserId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Review_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Review_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_ReviewId",
                table: "Images",
                column: "ReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_AppUserId2",
                table: "Bookings",
                column: "AppUserId2");

            migrationBuilder.CreateIndex(
                name: "IX_Review_AppUserId",
                table: "Review",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_TourId",
                table: "Review",
                column: "TourId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_AspNetUsers_AppUserId2",
                table: "Bookings",
                column: "AppUserId2",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Review_ReviewId",
                table: "Images",
                column: "ReviewId",
                principalTable: "Review",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_AspNetUsers_AppUserId2",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Review_ReviewId",
                table: "Images");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.DropIndex(
                name: "IX_Images_ReviewId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_AppUserId2",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ReviewId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "AppUserId2",
                table: "Bookings");
        }
    }
}
