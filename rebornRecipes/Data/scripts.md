### migrations
dotnet ef migrations add <name> -c ApplicationDbContext -s ../rebornRecipes -o ./Migrations
### migration script
dotnet ef migrations script -i -c ApplicationDbContext -s ../rebornRecipes -o script.sql
### updates 
dotnet ef update
