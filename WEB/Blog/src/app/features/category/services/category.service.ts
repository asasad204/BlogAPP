import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { environment } from 'src/environments/environment';
import { EditCategoryRequest } from '../models/edit-category-request.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  addCategory(category: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`, category);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories`);
  }
  getCategoryById(id:string): Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }
  updateCategory(id:string, request: EditCategoryRequest){
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}`, request);
  }
  //delete
  deleteCategoryById(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }
}
