import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthorizeService } from 'src/api-authorization/authorize.service';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  public userName: Observable<string>;

  recipe: Recipe = {
    name: '',
    image: '',
    isForked: false,
    instructions: '',
    ingredients: ''
  };
  submitted: boolean = false;

  constructor(private recipeService: RecipeService, private authorizeService: AuthorizeService) { }

  ngOnInit(): void {
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }

  saveRecipe(): void {

    const data = {
      name: this.recipe.name,
      image: this.recipe.image,
      isForked: this.recipe.isForked,
      instructions: this.recipe.instructions,
      ingredients: this.recipe.ingredients,
      createdBy: this.userName,
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
