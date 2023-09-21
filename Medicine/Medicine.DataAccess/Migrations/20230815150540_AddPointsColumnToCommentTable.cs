using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Medicine.DataAccess.Migrations
{
    public partial class AddPointsColumnToCommentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Points",
                table: "Comments",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Points",
                table: "Comments");
        }
    }
}
