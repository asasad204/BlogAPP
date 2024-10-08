import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddCategoryRequest } from '../models/add-category-request.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {
  category: AddCategoryRequest = { name: '', urlHandle: '' };
  private subscription!: Subscription;

  constructor(private categoryService: CategoryService, private router: Router) { }

  onSave(): void {
    this.subscription = this.categoryService.addCategory(this.category).subscribe(
      response => {
        console.log('Category added successfully!', response);
        this.router.navigate(['admin/categories']); // Redirect to categories list page
      },
      error => {
        console.error('There was an error adding the category!', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
