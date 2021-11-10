import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Recipe } from "../models/recipe";
import { AuthService } from './auth.service';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeCol: AngularFirestoreCollection<Recipe>;
  private user: firebase.User;

  constructor(
    private db: AngularFirestore,
    private readonly auth: AuthService,
  ) {
    this.recipeCol = db.collection('recipes');
    this.auth.user$.subscribe(user => this.user = user);
  }

  getRecipe(id: string): Observable<Recipe> {
    console.log("get " + id);
    return this.db.collection('recipes').doc<Recipe>(id).valueChanges();
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.db.collection<Recipe>('recipes', ref => ref.orderBy("name")).valueChanges();
  }

  getCategoryRecipes(categoryId: string): Observable<Recipe[]> {
    console.log("getCategoryRecipes")
    return this.db.collection<Recipe>('recipes', ref => ref
      .where("categoryIdArray", "array-contains", categoryId)
      .orderBy('name'))
      .valueChanges()
  }

  updateItem(recipe: Recipe): void {
    if (recipe.id == "new") {
      const id = this.db.createId();
      recipe.id = id;
      recipe.author = this.user.uid;
      this.recipeCol.doc(recipe.id).set(recipe);
    } else {
      this.recipeCol.doc(recipe.id).update(recipe);
    }
  }

}
