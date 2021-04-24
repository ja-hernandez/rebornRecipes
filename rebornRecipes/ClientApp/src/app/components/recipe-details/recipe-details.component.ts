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
  editMode: boolean = false;
  ratingReadonly:boolean = false;
  selectedRating: number = 0;


  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.message ='';
    this.getRecipe(this.route.snapshot.paramMap.get('id'))
  }

  getRecipe(id: string) {
    this.recipeService.get(id)
      .subscribe(
        recipe => {
          this.currentRecipe = recipe;
          console.log(recipe);
          this.parsedIngredients = recipe.ingredients.split("\n");
          this.parsedInstructions =  recipe.instructions.split("\n")
        },
        error => {
          console.log(error);
        }
      )
  }

  updateRating(rating):void {
    if (this.currentRecipe.numOfRatings > 0) {
      let _previousTotal = this.currentRecipe.rating * this.currentRecipe.numOfRatings;
      _previousTotal += rating;
    this.currentRecipe.numOfRatings += 1;
    this.currentRecipe.rating = _previousTotal/this.currentRecipe.numOfRatings;

    this.recipeService.update(this.currentRecipe.id, this.currentRecipe)
      .subscribe(
        response=> {
          console.log(response);
          this.message = 'Avg Rating updated!'
          console.log(this.message)
        },
        error => {
          console.log(error);
          }
        )
        }

      else if (this.currentRecipe.numOfRatings == 0) {
        this.currentRecipe.rating += rating;
        this.currentRecipe.numOfRatings += 1;


        this.recipeService.update(this.currentRecipe.id, this.currentRecipe)
      .subscribe(
        response=> {
          console.log(response);
          this.message = 'First Rating updated!'
          console.log(this.message)
        },
        error => {
          console.log(error);
          }
        )
        }
    this.ratingReadonly = true;      
  }

  updateRecipe(): void {
    this.recipeService.update(this.currentRecipe.id, this.currentRecipe)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'Recipe updated!';
        },
        error => {
          console.log(error);
        });
  }

  deleteRecipe(): void {
    this.recipeService.delete(this.currentRecipe.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/recipe-list'])
        },
        error => {
          console.log(error);
        }
      )
  }

  onEditClick() {
    this.editMode = !this.editMode;
  }
  
  reloadOnCancel() {
    this.onEditClick();
    location.reload();
  }
}
