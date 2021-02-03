import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoriesObservable: Observable<Category[]>;

  private ingredientsCol: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.ingredientsCol = db.collection('categories', ref => ref.orderBy('name'));

    this.categoriesObservable = this.ingredientsCol.valueChanges();
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesObservable;
  }

  getCategory(id: string): Observable<Category | undefined> {
    return this.categoriesObservable.pipe(map(categories=>categories.find(category=>category.id==id)));
  }

  getSubCategories(id: string): Observable<Category[]> {
    return this.categoriesObservable.pipe(map(categories=>categories.filter(category=>category.parentCategory==id)));
  }

  addCategory(ingredient: Category) {
    const id = this.db.createId();
    ingredient.id = id
    this.ingredientsCol.doc(id).set(ingredient);
  }

  updateCategory(ingredient: Category) {
    this.ingredientsCol.doc(ingredient.id).update(ingredient);
  }

}
