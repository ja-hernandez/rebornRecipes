import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpoonacularApiService {
  API_KEY:string = '66b549d4981d482cacc9bfcd14f5e684' ;
  constructor(private httpClient: HttpClient) { }

  /**
   * getRandomRecipe goes out and fetches random open-license recipes from Spoonacular api
   */
  public getRandomRecipe() {
    return this.httpClient.get(`https://api.spoonacular.com/recipes/random?apiKey=${this.API_KEY}&limitLicense=true&number=1`)
  }

}
