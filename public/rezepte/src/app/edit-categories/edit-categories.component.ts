import { Component, OnInit, Inject, Input } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from "../service/categories.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {

  constructor(
    private categoriesService: CategoriesService,
    public dialog: MatDialog
  ) { }

  categories: Category[] = []
  root: Category = { name: "/", id: "", parentCategory: "" };
  possibleParents: Category[] = [];

  ngOnInit(): void {
    this.subCategories();
  }

  subCategories() {
    this.categoriesService.getCategories().subscribe(item => {
      this.categories = item;
      this.categories.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });

      Object.assign(this.possibleParents, item)
      this.possibleParents.push(this.root)
      this.possibleParents.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      })
    });
  }

  childCategories(id: string) {
    return this.categories.filter(obj => {
      return obj.parentCategory == id;
    });
  }

  openDialog(category: Category): void {
    const dialogRef = this.dialog.open(EditCategoriesDialog, {
      width: '250px',
      data: { category: category, possibleParents: this.possibleParents }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.categoriesService.updateCategory(result);
    });
  }
}

@Component({
  selector: 'edit-categories-dialog',
  templateUrl: './edit-categories-dialog.component.html',
})
export class EditCategoriesDialog {

  category: Category;
  possibleParents: Category[];

  constructor(
    public dialogRef: MatDialogRef<EditCategoriesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category, possibleParents: Category[] }
  ) {
    this.category = Object.assign({}, data.category);
    this.possibleParents = Object.assign([], data.possibleParents)

    this.possibleParents = this.removeChildCategories(this.category.id);

  }

  removeChildCategories(id: string) {        
    return this.possibleParents.filter(obj => {
      return obj.parentCategory != id && obj.id != id;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
