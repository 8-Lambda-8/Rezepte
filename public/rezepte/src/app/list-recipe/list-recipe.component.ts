import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.scss']
})
export class ListRecipeComponent implements OnInit {

  @Input() recipeArray: Recipe[];

  constructor() { }

  ngOnInit(): void {
  }

}
