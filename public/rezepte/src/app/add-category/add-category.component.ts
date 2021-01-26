import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from "../service/categories.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private categoriesService: CategoriesService,
  ) { }

  category: Category = { name: "", id: "", parentCategory: "" };
  root: Category = { name: "/", id: "", parentCategory: "" };
  possibleParents: Category[] = [];

  ngOnInit(): void {
    this.subCategories();
  }


  subCategories() {
    this.categoriesService.getCategories().subscribe(item => {
      this.possibleParents = item;
      this.possibleParents.push(this.root)
      this.possibleParents.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      })

    });
  }

  onSubmit() {
    console.log(this.category)
    if (this.category.name != "" && !this.possibleParents.some(element => element.name == this.category.name)) {
      this.categoriesService.addCategory(this.category)
      this.category.name = "";
      this.category.parentCategory = "";
    }
  }

}
