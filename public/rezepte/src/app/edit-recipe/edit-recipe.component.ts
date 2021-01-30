import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Recipe } from "../models/recipe";
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from "../service/recipe.service";
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Category } from '../models/category';
import { CategoriesService } from "../service/categories.service";
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { Ingredient } from '../models/ingredient';
import { IngredientsService } from "../service/ingredients.service";

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  id: string
  title: string = "Edit Recipe";

  recipe: Recipe = { name: "", categories: [], categoryIdArray: [], ingredients: [], author: "", text: "", id: "new" };
  categories: Category[] = [];
  ingredients: Ingredient[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private categoriesService: CategoriesService,
    private ingredientsService: IngredientsService
  ) {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterC(name) : this.categories.slice())
    );
    this.filteredIngredients = this.addIngredientCtrl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterI(name) : this.ingredients.slice())
    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRecipe();
    this.subCategories();
    this.subIngredientsService();
  }

  getRecipe(): void {
    if (this.id == "new") {
      this.title = "Add Recipe";
    } else {
      this.recipeService.getRecipe(this.id)
        .subscribe(recipe => this.recipe = recipe);
    }
  }

  subCategories() {
    this.categoriesService.getCategories().subscribe(item => {
      this.categories = item;
      this.categories.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
      this.categoryCtrl.setValue("x");
      this.categoryCtrl.setValue("");
    });
  }

  subIngredientsService() {
    this.ingredientsService.getIngredients().subscribe(item => {
      this.ingredients = item;
      this.ingredients.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
      this.addIngredientCtrl.setValue("x");
      this.addIngredientCtrl.setValue("");
    });
  }


  //category chips stuff
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoC') matAutocomplete: MatAutocomplete;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  categoryCtrl = new FormControl();
  filteredCategories: Observable<Category[]>;

  remove(category: Category): void {
    let index = this.recipe.categories.indexOf(category);

    if (index >= 0) {
      this.recipe.categories.splice(index, 1);
    }
    index = this.recipe.categoryIdArray.indexOf(category.id);

    if (index >= 0) {
      this.recipe.categoryIdArray.splice(index, 1);
    }
  }

  selectedC(event: MatAutocompleteSelectedEvent): void {
    if (!this.recipe.categoryIdArray.includes(event.option.value.id)){
      this.recipe.categories.push(event.option.value);
      this.recipe.categoryIdArray.push(event.option.value.id);
    }else console.log("Already contains Category");
    console.log(this.recipe.categories)
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue("x");
    this.categoryCtrl.setValue("");
  }

  private _filterC(name: string): Category[] {
    const filterValue = name.toLowerCase();
    return this.categories.filter(categoriy => categoriy.name.toLowerCase().indexOf(filterValue) === 0);
  }

  //ingredient Stuff
  @ViewChild('ingredientInput') ingredientInput: ElementRef<HTMLInputElement>;
  displayedColumns: string[] = ['name', 'amount', 'unit'];

  addIngredientCtrl = new FormControl();
  filteredIngredients: Observable<Ingredient[]>;

  getUnitListOfIngredient(ingredientId: string): string[] {
    return this.ingredients.find(ing => ing.id == ingredientId).possibleUnits;
  }


  selectedI(event: MatAutocompleteSelectedEvent): void {
    if (!this.recipe.ingredients.some(ing => ing.id == event.option.value.id))
      this.recipe.ingredients.push({ id: event.option.value.id, name: event.option.value.name, unit: "", amount: 0 });
    else console.log("Already contains Ingredient");
    console.log(this.recipe.ingredients)
    this.ingredientInput.nativeElement.value = '';
    this.addIngredientCtrl.setValue("x");
    this.addIngredientCtrl.setValue("");
  }

  private _filterI(name: string): Ingredient[] {
    const filterValue = name.toLowerCase();
    return this.ingredients.filter(ingredient => ingredient.name.toLowerCase().indexOf(filterValue) === 0);
  }


  onSubmit() {
    if (this.recipe.name != ""/* &&this.ingredient.possibleUnits!=[] */) {
      this.recipeService.updateItem(this.recipe)
    }

    //navigate to recipe
  }

}
