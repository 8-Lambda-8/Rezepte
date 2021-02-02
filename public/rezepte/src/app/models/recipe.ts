import { Ingredient } from "./ingredient";
import { Category } from "./category";
import { IngredientEntry } from "./ingredientEntry";

export interface Recipe{
    id: string;
    name: string;
    author: string;
    categories:Category[];
    categoryIdArray: string[];
    ingredients:IngredientEntry[];
    text:string;
    originalText:string;
    /* rating:number; */
}