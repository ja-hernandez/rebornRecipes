import { Component, OnInit } from '@angular/core';
import { RecipeService } from "src/app/services/recipe.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: any;
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.retrieveRecipes();
  }

  retrieveRecipes() {
    this.recipeService.getAll()
      .subscribe(
        data => {
          this.recipes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
