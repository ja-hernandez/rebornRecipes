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
  createdBy:string;

  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;


  submitted: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private authorizeService: AuthorizeService,
    ) { }

  ngOnInit(): void { 
    this.checkIfForking();
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
   }

   checkIfForking(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.id;
    if (this.id) {
      this.getRecipe(this.id);
    }
   }

  saveRecipe(): void {
    this.userName.subscribe(
      user => this.createdBy = user
    );

    const data = {
      name: this.recipe.name,
      image: this.recipe.image,
      isForked: this.recipe.isForked,
      instructions: this.recipe.instructions,
      ingredients: this.recipe.ingredients,
      parentId: Number(this.recipe.parentId),
      createdBy: this.createdBy,
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
          this.recipe = recipe;
          console.log(recipe);
          this.recipe.isForked = true;
          this.recipe.parentId = id;
          this.recipe.id = null;
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
