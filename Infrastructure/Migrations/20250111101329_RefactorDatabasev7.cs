using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RefactorDatabasev7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Review_ReviewId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_AspNetUsers_AppUserId",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_Tours_TourId",
                table: "Review");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Review",
                table: "Review");

            migrationBuilder.RenameTable(
                name: "Review",
                newName: "Reviews");

            migrationBuilder.RenameIndex(
                name: "IX_Review_TourId",
                table: "Reviews",
                newName: "IX_Reviews_TourId");

            migrationBuilder.RenameIndex(
                name: "IX_Review_AppUserId",
                table: "Reviews",
                newName: "IX_Reviews_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images",
                column: "ItineraryId",
                principalTable: "Itinerarys",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Reviews_ReviewId",
                table: "Images",
                column: "ReviewId",
                principalTable: "Reviews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_AspNetUsers_AppUserId",
                table: "Reviews",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Tours_TourId",
                table: "Reviews",
                column: "TourId",
                principalTable: "Tours",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Reviews_ReviewId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_AspNetUsers_AppUserId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Tours_TourId",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews");

            migrationBuilder.RenameTable(
                name: "Reviews",
                newName: "Review");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_TourId",
                table: "Review",
                newName: "IX_Review_TourId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_AppUserId",
                table: "Review",
                newName: "IX_Review_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Review",
                table: "Review",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images",
                column: "ItineraryId",
                principalTable: "Itinerarys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Review_ReviewId",
                table: "Images",
                column: "ReviewId",
                principalTable: "Review",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_AspNetUsers_AppUserId",
                table: "Review",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Tours_TourId",
                table: "Review",
                column: "TourId",
                principalTable: "Tours",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
