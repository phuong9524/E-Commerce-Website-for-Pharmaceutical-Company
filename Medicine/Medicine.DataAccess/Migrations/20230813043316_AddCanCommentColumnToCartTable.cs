using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Medicine.DataAccess.Migrations
{
    public partial class AddCanCommentColumnToCartTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CanComment",
                table: "Carts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CanComment",
                table: "Carts");
        }
    }
}
