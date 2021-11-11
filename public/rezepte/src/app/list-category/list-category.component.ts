import { Component, OnInit } from '@angular/core';
import { CategoryMap } from '../models/categoryMap';
import { CategoriesService } from '../service/categories.service';
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
    this.categoriesService.getCategoryMap().subscribe(item => this.dataSource = new ArrayDataSource(item));
  }
  treeControl = new NestedTreeControl<CategoryMap>(node => node.children);
  dataSource = new ArrayDataSource([]);

  hasChild = (_: number, node: CategoryMap) => !!node.children && node.children.length > 0;

}
