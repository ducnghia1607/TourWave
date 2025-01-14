using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RefactorSchedule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Availability",
                table: "Tours");

            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "Tours");

            migrationBuilder.AddColumn<decimal>(
                name: "PriceAdult",
                table: "Schedules",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PriceChild",
                table: "Schedules",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceAdult",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "PriceChild",
                table: "Schedules");

            migrationBuilder.AddColumn<bool>(
                name: "Availability",
                table: "Tours",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "Tours",
                type: "int",
                nullable: true);
        }
    }
}
