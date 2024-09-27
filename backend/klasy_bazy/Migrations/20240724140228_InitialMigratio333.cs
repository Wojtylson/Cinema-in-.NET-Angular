using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace klasy_bazy.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigratio333 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Start",
                table: "ReservationDetails",
                newName: "Hour");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Hour",
                table: "ReservationDetails",
                newName: "Start");
        }
    }
}
