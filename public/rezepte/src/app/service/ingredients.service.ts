import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Ingredient } from "../models/ingredient";

@Injectable({
  providedIn: 'root'
})
export class ingredientsService {
  
  ingredients: Ingredient[] = [];

  ingredientsObservable: Observable<any[]>;

  private ingredientsCol: AngularFirestoreCollection<Ingredient>;

  constructor(private db: AngularFirestore) {
    this.ingredientsCol = db.collection('ingredients',ref => ref.orderBy('name'))
    
    this.ingredientsObservable = this.ingredientsCol.valueChanges();
    
    this.ingredientsObservable.subscribe(entry=> {
      this.ingredients = entry;
    }); 
  }


  getIngredients(): Observable<Ingredient[]> {    
    return this.ingredientsObservable;//of(this.ingredients);
  }

  getIngredient(id: string): Observable<Ingredient | undefined> {
    return of(this.ingredients.find(ingredient => ingredient.id === id));
  }

  addItem(ingredient: Ingredient) {
    const id = this.db.createId();
    ingredient.id = id
    this.ingredientsCol.doc(id).set(ingredient);
  }


  updateItem(ingredient: Ingredient) {
    this.ingredientsCol.doc(ingredient.id).update(ingredient);
  }


}
