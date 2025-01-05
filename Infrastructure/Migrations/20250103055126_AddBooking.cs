using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Consultings_Tours_TourId",
                table: "Consultings");

            migrationBuilder.AlterColumn<int>(
                name: "TourId",
                table: "Consultings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumChildren = table.Column<int>(type: "int", nullable: false),
                    NumAdults = table.Column<int>(type: "int", nullable: false),
                    PricePerChild = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PricePerAdult = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    AppUserId = table.Column<int>(type: "int", nullable: false),
                    ScheduleId = table.Column<int>(type: "int", nullable: false),
                    DepartureDate = table.Column<DateOnly>(type: "date", nullable: false),
                    ReturnDate = table.Column<DateOnly>(type: "date", nullable: false),
                    PaymentIntentId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClientSecret = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bookings_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_AspNetUsers_AppUserId1",
                        column: x => x.AppUserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Bookings_Schedules_ScheduleId",
                        column: x => x.ScheduleId,
                        principalTable: "Schedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_AppUserId",
                table: "Bookings",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_AppUserId1",
                table: "Bookings",
                column: "AppUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ScheduleId",
                table: "Bookings",
                column: "ScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_TourId",
                table: "Bookings",
                column: "TourId");

            migrationBuilder.AddForeignKey(
                name: "FK_Consultings_Tours_TourId",
                table: "Consultings",
                column: "TourId",
                principalTable: "Tours",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Consultings_Tours_TourId",
                table: "Consultings");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.AlterColumn<int>(
                name: "TourId",
                table: "Consultings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Consultings_Tours_TourId",
                table: "Consultings",
                column: "TourId",
                principalTable: "Tours",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
