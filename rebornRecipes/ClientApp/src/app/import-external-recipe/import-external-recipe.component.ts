import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { SpoonacularApiService } from "../services/spoonacular-api.service";
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-import-external-recipe',
  templateUrl: './import-external-recipe.component.html',
  styleUrls: ['./import-external-recipe.component.css']
})
export class ImportExternalRecipeComponent implements OnInit {
  rawRandomRecipe: any;
  public randomRecipe: Recipe = {
    name: '',
    image: '',
    isForked: false,
    instructions: '',
    ingredients: ''
  };

  parsedIngredients: any;
  parsedInstructions: any;
  createdBy:string;
  parser = new DOMParser();
  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;
  submitted: boolean = false;

  constructor(
    private spoonacularApiService: SpoonacularApiService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private authorizeService: AuthorizeService
    ) { }

  ngOnInit() {
    this.spoonacularApiService.getRandomRecipe()
    .subscribe(
      (data) => {
        console.log(data);
        this.rawRandomRecipe = data['recipes'][0];
        this.randomRecipe.name = this.rawRandomRecipe.title;
        this.randomRecipe.image = this.rawRandomRecipe.image;
        this.parsedIngredients = this.rawRandomRecipe.extendedIngredients;
        this.randomRecipe.ingredients = this.parsedIngredientstoString(this.parsedIngredients);
        this.parsedInstructions = this.parser.parseFromString(this.rawRandomRecipe.instructions, 'text/html')
                                    .documentElement.textContent.split('.');
        this.randomRecipe.instructions = this.parsedInstructions.map(x => x.trim()).join('\n');
      },
        error => {
          console.log(error);
        }
      );
      this.isAuthenticated = this.authorizeService.isAuthenticated();
      this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }

  saveRecipe(): void {
    this.userName.subscribe(
      user => this.createdBy = user
    );

    const data = {
      name: this.randomRecipe.name,
      image: this.randomRecipe.image,
      isForked: this.randomRecipe.isForked,
      instructions: this.randomRecipe.instructions,
      ingredients: this.randomRecipe.ingredients  ,
      createdBy: this.createdBy,
    };

    this.recipeService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/recipe',response.id])
        },
        error => {
          console.log(error);
        });
  }

  newRecipe() {
    this.submitted = false;
    this.randomRecipe = {
      name: '',
      image: '',
      isForked: false,
      instructions: '',
      ingredients: ''
    };
  }

  //TODO: REMOVE AFTER TESTING
  get diagnostic() { return JSON.stringify(this.randomRecipe); }

  parsedIngredientstoString(arr: Object[]):string {
    let str: string = '';
    arr.forEach(element => {
      str += element["originalName"] + "\n";
    });
    return str; 
}}
