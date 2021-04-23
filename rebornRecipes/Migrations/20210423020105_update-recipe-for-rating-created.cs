using Microsoft.EntityFrameworkCore.Migrations;

namespace rebornRecipes.Migrations
{
    public partial class updaterecipeforratingcreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_AspNetUsers_CreatedById",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_CreatedById",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Recipes");

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Recipes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumOfRatings",
                table: "Recipes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NumOfRatings",
                table: "Recipes");

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Recipes",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_CreatedById",
                table: "Recipes",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_AspNetUsers_CreatedById",
                table: "Recipes",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
