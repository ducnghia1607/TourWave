using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RefactorDatabasev3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images",
                column: "ItineraryId",
                principalTable: "Itinerarys",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Itinerarys_ItineraryId",
                table: "Images",
                column: "ItineraryId",
                principalTable: "Itinerarys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
