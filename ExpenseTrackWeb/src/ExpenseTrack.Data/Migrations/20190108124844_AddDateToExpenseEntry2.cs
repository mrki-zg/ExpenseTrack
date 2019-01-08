using Microsoft.EntityFrameworkCore.Migrations;

namespace ExpenseTrack.Data.Migrations
{
    public partial class AddDateToExpenseEntry2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Created",
                table: "ExpenseEntries",
                newName: "DateAdded");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateAdded",
                table: "ExpenseEntries",
                newName: "Created");
        }
    }
}
