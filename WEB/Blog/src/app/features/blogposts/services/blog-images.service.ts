
import { BlogImagePost } from '../models/blog-image-post.model';
import { BlogImage } from '../models/blog-image.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class BlogImagesService {

  constructor(private http: HttpClient) { }

  saveBlogImage(blogImage: BlogImagePost): Observable<BlogImagePost> {
    return this.http.post<BlogImagePost>(`${environment.apiBaseUrl}/api/blogImages/upload`, blogImage, httpOptions);
  }


  uploadImage(file: File, fileName: string, title: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post(`${environment.apiBaseUrl}/api/blogImages/upload`, formData);
  }



  getBlogImages(): Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/blogImages`);
  }




}