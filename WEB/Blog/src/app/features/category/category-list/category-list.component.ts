import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories$!: Observable<Array<Category>>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }
  deleteCategory(id: string){
    return this.categoryService.deleteCategoryById(id).subscribe({
      next: () => {
        window.alert('Category deleted succesfully!');
        this.categories$ = this.categoryService.getCategories();
      },
      error: () => {
        window.alert('Failed to delete the category.');
      }
    });
  }

}
