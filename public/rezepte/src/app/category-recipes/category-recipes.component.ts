import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { CategoriesService } from '../service/categories.service';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-category-recipes',
  templateUrl: './category-recipes.component.html',
  styleUrls: ['./category-recipes.component.scss']
})
export class CategoryRecipesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private categoriesService: CategoriesService,
  ) { }

  id: string;
  categoriesArray: string[] = [];
  recipeArray: Recipe[] = []
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.addSubCategoriesToArray(this.id);
  }

  addSubCategoriesToArray(id: string){
    console.log("addSubCategoriesToArray_"+id)
    if(!this.categoriesArray.includes(id))
      this.categoriesArray.push(id);

    this.recipeService.getCategoryRecipes(id).subscribe(recipes=>{
      recipes.forEach(recipe=>{
        if(!this.recipeArray.find(r=>r.id==recipe.id  ))
          this.recipeArray.push(recipe);
      })
    });
    this.categoriesService.getSubCategories(id).subscribe(subCategories=>{
      subCategories.forEach(category=>this.addSubCategoriesToArray(category.id))
    });
  }

}
