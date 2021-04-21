import { Component, OnInit } from '@angular/core';
import { RecipeService } from "src/app/services/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  currentRecipe: any;
  message = '';
  parsedIngredients: string[];
  parsedInstructions: string[];


  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.message ='';
    this.getRecipe(this.route.snapshot.paramMap.get('id'))
  }

  getRecipe(id) {
    this.recipeService.get(id)
      .subscribe(
        recipe => {
          this.currentRecipe = recipe;
          console.log(recipe);
          this.parsedIngredients = recipe.ingredients.split("\n");
          this.parsedInstructions =  recipe.instructions.split(". ")
        },
        error => {
          console.log(error);
        }
      )
  }
}
