import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { EditIngredientsComponent } from './edit-ingredients/edit-ingredients.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const routes: Routes = [
  { path: '', component: EditIngredientsComponent },
  { path: 'editIngredients', component: EditIngredientsComponent },
  { path: 'editCategories', component: EditCategoriesComponent },
  { path: 'editRecipe/:id', component: EditRecipeComponent }

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