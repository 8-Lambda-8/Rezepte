import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/* External Modules */
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


/* Components */
import { AppComponent } from './app.component';

import { RecipeComponent } from './recipe/recipe.component';
import { ListRecipeComponent } from './list-recipe/list-recipe.component';
import { ListCategoryComponent } from './list-category/list-category.component';

import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { EditIngredientsComponent, } from './edit-ingredients/edit-ingredients.component';
import { EditCategoriesComponent, EditCategoriesDialog } from './edit-categories/edit-categories.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeWizardComponent } from "./edit-recipe/recipe-wizard-dialog.component";
import { CategoryRecipesComponent } from './category-recipes/category-recipes.component';


import { environment } from 'src/environments/environment';

/* Material Components  */
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatSidenavModule } from '@angular/material/sidenav';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';






@NgModule({
  declarations: [
    AppComponent,
    
    RecipeComponent,
    ListRecipeComponent,
    ListCategoryComponent,

    AddIngredientComponent,
    EditIngredientsComponent,
    LoginComponent,
    HeaderComponent,
    ProfileCardComponent,
    EditCategoriesComponent,
    EditCategoriesDialog,
    AddCategoryComponent,
    EditRecipeComponent,
    RecipeWizardComponent,
    CategoryRecipesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTableModule,
    DragDropModule,
    CdkTreeModule,
    AngularFireFunctionsModule
  ],
  exports: [MatFormFieldModule],
  providers: [AngularFireModule, AngularFirestoreModule, AngularFireAuthModule,{ provide: REGION, useValue: 'europe-west3' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
