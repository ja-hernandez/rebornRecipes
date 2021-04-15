import { Ingredients } from "./ingredients.model";

export class Recipe {
  id?: any;
  name?: string;
  rating?: number;
  image?: string;
  createdBy?: string;
  ingredients?: Ingredients[];
}

