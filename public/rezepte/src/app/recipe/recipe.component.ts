import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  id: string;
  recipe: Recipe = { name: "", categories: [], categoryIdArray: [], ingredients: [], author: "", text: "", id: "new" };

  displayedColumns: string[] = ['name', 'amount', 'unit'];
  
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRecipe();
  }

  getRecipe(): void {

    this.recipeService.getRecipe(this.id)
      .subscribe(recipe =>{
        this.recipe = recipe
      });
  }

}
