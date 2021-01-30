import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryRecipesComponent } from './category-recipes/category-recipes.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { EditIngredientsComponent } from './edit-ingredients/edit-ingredients.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
  { path: '', component: EditIngredientsComponent },
  { path: 'editIngredients', component: EditIngredientsComponent },
  { path: 'editCategories', component: EditCategoriesComponent },
  { path: 'editRecipe/:id', component: EditRecipeComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'categoryRecipes/:id', component: CategoryRecipesComponent}

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }