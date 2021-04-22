import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipe: Recipe = {
    name: '',
    image: '',
    isForked: false,
    instructions: '',
    ingredients: ''
  };
  id!: string;
  isAddMode!: boolean;
  currentRecipe: any;
  message = '';
  parsedIngredients: string[];
  parsedInstructions: string[];

  submitted: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void { 
    this.checkIfForking();
   }

   checkIfForking(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.id;
    if (this.id) {
      this.getRecipe(this.id);
      this.currentRecipe.isForked = true;
    }
   }

  saveRecipe(): void {

    const data = {
      name: this.recipe.name,
      image: this.recipe.image,
      isForked: this.recipe.isForked,
      instructions: this.recipe.instructions,
      ingredients: this.recipe.ingredients,
    };

    this.recipeService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  getRecipe(id: string) {
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

  newRecipe() {
    this.submitted = false;
    this.recipe = {
      name: '',
      image: '',
      isForked: false,
      instructions: '',
      ingredients: ''
    };
  }

  //TODO: REMOVE AFTER TESTING
  get diagnostic() { return JSON.stringify(this.recipe); }
}
