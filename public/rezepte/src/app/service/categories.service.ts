import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from "../models/category";
import { CategoryMap } from '../models/categoryMap';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesObservable: Observable<Category[]>;
  private categoriesChange: Subject<Category[]> = new Subject();
  private categoryMapChange: Subject<CategoryMap[]> = new Subject();
  private categories: Category[];

  private categoriesCol: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.categoriesCol = db.collection('categories', ref => ref.orderBy('name'));

    this.categoriesObservable = this.categoriesCol.valueChanges();
    this.categoriesObservable.subscribe(data => {
      this.categories = data;
      this.categoriesChange.next(data);
      this.categoryMapChange.next(this.categoryMapRecursive(''));
    })
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesChange.asObservable();
  }

  getCategory(id: string): Category {
    return this.categories.find(category => category.id == id);
  }

  getSubCategories(id: string): Observable<Category[]> {
    return this.categoriesChange.asObservable().pipe(map(categories => categories.filter(category => category.parentCategory == id)));
  }

  private categoryMapRecursive(id: string): CategoryMap[] {
    let catMap: CategoryMap[] = [];
    this.categories.filter(obj => obj.parentCategory == id).forEach(cat => {
      catMap.push({
        id: cat.id,
        name: cat.name,
        children: this.categoryMapRecursive(cat.id)
      })
    });
    return catMap;
  }

  getCategoryMap(): Observable<CategoryMap[]> {
    return this.categoryMapChange.asObservable();
  }

  addCategory(category: Category) {
    if (category) {      
      const id = this.db.createId();
      category.id = id;
      this.categoriesCol.doc(id).set(category);
    }
  }

  updateCategory(category: Category) {
    if (category) {      
      this.categoriesCol.doc(category.id).update(category);
    }
  }

}
