using Microsoft.EntityFrameworkCore.Migrations;

namespace rebornRecipes.Migrations
{
    public partial class updateRecipe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsForked",
                table: "Recipes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "Recipes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsForked",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Recipes");
        }
    }
}
