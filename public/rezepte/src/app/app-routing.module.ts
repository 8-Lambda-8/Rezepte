import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { EditIngredientsComponent } from './edit-ingredients/edit-ingredients.component';

const routes: Routes = [
  { path: '', component: EditIngredientsComponent },
  { path: 'editIngridients', component: EditIngredientsComponent },
  { path: 'editCategories', component: EditCategoriesComponent },

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