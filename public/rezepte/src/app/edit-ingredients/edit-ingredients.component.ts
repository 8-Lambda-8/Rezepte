import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../models/ingredient";
import { IngredientsService } from "../service/ingredients.service";
import { UNITS } from "../possible-units";


@Component({
  selector: 'app-edit-ingredients',
  templateUrl: './edit-ingredients.component.html',
  styleUrls: ['./edit-ingredients.component.scss']
})
export class EditIngredientsComponent implements OnInit {

  constructor(
    private ingredientsService: IngredientsService,
  ) { }

  ingredients: Ingredient[] = [];

  ngOnInit(): void {
    this.subIngredients();
  }

  subIngredients() {
    this.ingredientsService.getIngredients().subscribe(item => this.ingredients = item);
  }

  unitList: string[] = UNITS;

  onChange(ingredient: Ingredient){
    console.log(ingredient);
    this.ingredientsService.updateItem(ingredient);
  }


}
