import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss']
})
export class AllRecipesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
  ) { }

  id: string;
  name: string;
  recipeArray: Recipe[] = []
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getAllRecipes().subscribe(recipes=>this.recipeArray = recipes);
  }

}
