import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../models/ingredient";
import { IngredientsService } from "../service/ingredients.service";
import { UNITS } from "../possible-units";
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss']
})

export class AddIngredientComponent implements OnInit {

  constructor(
    private ingredientsService: IngredientsService,
  ) { }

  name = new FormControl();
  units = new FormControl();

  unitList: string[] = UNITS;
  ingredient: Ingredient = { id: "", name: "", possibleUnits: [] };

  ngOnInit(): void {
    /* this.getIngredients(); */
  }

  /* getIngredients() {
    this.ingredientsService.getIngredients().subscribe(item => console.log(item));
  } */

  onSubmit() {
    if (this.ingredient.name != "" && this.ingredient.possibleUnits != []) {
      this.ingredientsService.addItem(this.ingredient)
      this.ingredient.name = "";
      this.ingredient.possibleUnits = [];
    }
  }

}
