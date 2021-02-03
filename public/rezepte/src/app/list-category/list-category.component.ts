import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/category';
import { CategoryMap } from '../models/categoryMap';
import { Recipe } from '../models/recipe';
import { CategoriesService } from '../service/categories.service';
import { RecipeService } from '../service/recipe.service';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  constructor(
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.subCategories();
  }

  categories: Category[] = [];
  categoryMap: CategoryMap[] = [];
  treeControl = new NestedTreeControl<CategoryMap>(node => node.children);
  dataSource = new ArrayDataSource(this.categoryMap);

  subCategories() {
    this.categoriesService.getCategories().subscribe(item => {
      this.categories = item;
      this.categories.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
      this.updateCategoryMap();
    });
  }

  childCategories(id: string) {
    return this.categories.filter(obj => {
      return obj.parentCategory == id;
    });
  }

  updateCategoryMap() {
    this.categoryMap = this.categoryMapRecursive("");
    this.dataSource = new ArrayDataSource(this.categoryMap);
  }

  categoryMapRecursive(id: string): CategoryMap[] {
    let catMap: CategoryMap[] = [];
    this.childCategories(id).forEach(cat => {
      catMap.push({
        id: cat.id,
        name: cat.name,
        children: this.categoryMapRecursive(cat.id)
      })
    });

    return catMap;
  }

  hasChild = (_: number, node: CategoryMap) => !!node.children && node.children.length > 0;

}
