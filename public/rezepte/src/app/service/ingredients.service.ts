import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Ingredient } from "../models/ingredient";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  ingredients: Ingredient[] = [];

  ingredientsObservable: Observable<Ingredient[]>;
  private ingredientsChange: Subject<Ingredient[]> = new Subject();

  private ingredientsCol: AngularFirestoreCollection<Ingredient>;

  constructor(private db: AngularFirestore) {
    this.ingredientsCol = db.collection('ingredients', ref => ref.orderBy('name'))

    this.ingredientsObservable = this.ingredientsCol.valueChanges();

    this.ingredientsObservable.subscribe(entry => {
      this.ingredients = entry;
      this.ingredientsChange.next(entry);
    });
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredientsChange.asObservable();
  }

  getIngredient(id: string): Observable<Ingredient | undefined> {
    return this.ingredientsChange.asObservable().pipe(map(ingredients => ingredients.find(ingredients => ingredients.id == id)));
  }

  addIngredient(ingredient: Ingredient) {
    if (ingredient) {
      const id = this.db.createId();
      ingredient.id = id
      this.ingredientsCol.doc(id).set(ingredient);
    }
  }

  updateIngredient(ingredient: Ingredient) {
    if (ingredient) {
      this.ingredientsCol.doc(ingredient.id).update(ingredient);
    }
  }

}
