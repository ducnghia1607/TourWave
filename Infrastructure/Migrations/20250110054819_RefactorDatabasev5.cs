using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RefactorDatabasev5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Tours_TourId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images",
                column: "ItineraryId",
                principalTable: "Itinerarys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Tours_TourId",
                table: "Images",
                column: "TourId",
                principalTable: "Tours",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Tours_TourId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images",
                column: "ItineraryId",
                principalTable: "Itinerarys",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Tours_TourId",
                table: "Images",
                column: "TourId",
                principalTable: "Tours",
                principalColumn: "Id");
        }
    }
}
