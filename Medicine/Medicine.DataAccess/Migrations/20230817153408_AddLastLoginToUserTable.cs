using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Medicine.DataAccess.Migrations
{
    public partial class AddLastLoginToUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastLogIn",
                table: "Users",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastLogIn",
                table: "Users");
        }
    }
}
