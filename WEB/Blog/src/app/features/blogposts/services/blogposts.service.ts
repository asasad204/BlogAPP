import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddBlogPostRequest } from '../models/add-blog-post-request.model';
import { BlogPost } from '../models/blogpost.model';
import { EditBlogPostRequest } from '../models/edit-blog-post-request.model';
@Injectable({
  providedIn: 'root'
})
export class BlogPostsService {

  constructor(private http: HttpClient) {}

  addPost(blogpost: AddBlogPostRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/blogposts`, blogpost);
  }

  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }
  getPostById(id:string): Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }
  editPost(id:string, request: EditBlogPostRequest){
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`, request);
  }
  //delete
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }
  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/blog/${urlHandle}`);
  }
}