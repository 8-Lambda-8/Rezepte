import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories: Category[] = [];

  categoriesObservable: Observable<any[]>;

  private ingredientsCol: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.ingredientsCol = db.collection('categories',ref => ref.orderBy('name'))
    
    this.categoriesObservable = this.ingredientsCol.valueChanges();
    
    this.categoriesObservable.subscribe(entry=> {
      this.categories = entry;
    }); 
  }

  getCategories(): Observable<Category[]> {    
    return this.categoriesObservable;
  }

  getCategory(id: string): Observable<Category | undefined> {
    return of(this.categories.find(ingredient => ingredient.id === id));
  }

  getSubCategories(id: string): Observable<Category[] | undefined> {
    console.log("getSubCategories_"+id)
    console.log(this.categories)
    return of(this.categories.filter(ingredient => ingredient.parentCategory === id));
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
