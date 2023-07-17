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

  recipeForm = new Recipe(); 

  id!: string;
  isAddMode!: boolean;
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
    this.recipeForm; 
    this.checkIfForking();
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
   }

   checkIfForking(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.id;
    if (this.id) {
      this.getRecipe(parseInt(this.id));
    }
   }

  saveRecipe(): void {
    this.userName.subscribe(
      user => {this.createdBy = user;
        console.log(`Grabbed the current user: ${this.createdBy}`)
      }
    );
    
    // const data = {
    //   name: this.recipe.name,
    //   image: this.recipe.image,
    //   isForked: this.recipe.isForked,
    //   instructions: this.recipe.instructions,
    //   ingredients: this.recipe.ingredients,
    //   parentId: Number(this.recipe.parentId),
    //   createdBy: this.createdBy,
    // };

    console.log(this.isAddMode);
    if(this.isAddMode == false) {
      this.recipeForm.id = undefined;
      this.recipeForm.createdBy = this.createdBy;
      this.recipeForm.parentId = parseInt(this.id);
    }

    this.recipeService.create(this.recipeForm)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['recipe',response.id])
        },
        error => {
          console.log(error);
        });
  }

  getRecipe(id: number) {
    this.recipeService.get(id)
      .subscribe(
        recipe => {
          this.recipeForm = recipe;
          console.log(recipe);
          this.recipeForm.isForked = true;
          this.recipeForm.parentId = id;
          },
        error => {
          console.log(error);
        },
      )
  }

  newRecipe() {
    this.submitted = false;
    this.recipeForm = {
      name: '',
      image: '',
      isForked: false,
      instructions: '',
      ingredients: ''
    };
  }

  //TODO: REMOVE AFTER TESTING
  get diagnostic() { return JSON.stringify(this.recipeForm); }
}
