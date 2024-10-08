import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { EditCategoryRequest } from '../models/edit-category-request.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy{
  id:string = '';
  category?: Category;
  paramsSubscription?: Subscription;
  updateCategorySubscription?: Subscription;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router){
  }
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next:(params) =>{
        this.id = params.get('id') ?? '';
        this.categoryService.getCategoryById(this.id).subscribe({
          next: (res) =>{
            this.category = res;
            console.log(this.category);
          }
        })
      }
    })
  }
  onFormSubmit(){
    var request: EditCategoryRequest ={
      name:this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };
    this.updateCategorySubscription = this.categoryService.updateCategory(this.id, request).subscribe({
      next: () =>{
        this.router.navigateByUrl('/admin/categories')
      }
    })
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateCategorySubscription?.unsubscribe();
  }
}
