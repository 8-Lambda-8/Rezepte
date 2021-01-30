import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/category';
import { Recipe } from '../models/recipe';
import { CategoriesService } from '../service/categories.service';
import { RecipeService } from '../service/recipe.service';

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

  subCategories() {
    this.categoriesService.getCategories().subscribe(item => {
      this.categories = item;
      this.categories.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    });
  }

  childCategories(id: string) {
    return this.categories.filter(obj => {
      return obj.parentCategory == id;
    });
  }

}
