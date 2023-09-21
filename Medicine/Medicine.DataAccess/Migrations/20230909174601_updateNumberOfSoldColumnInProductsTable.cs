using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Medicine.DataAccess.Migrations
{
    public partial class updateNumberOfSoldColumnInProductsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfSold",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfSold",
                table: "Products");
        }
    }
}
