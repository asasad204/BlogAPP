import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { BlogPostsService } from '../services/blogposts.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  blogPosts$!: Observable<Array<BlogPost>>;

  constructor(private blogPostService: BlogPostsService) {}

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getPosts();
  }
  deletePost(id: string){
    return this.blogPostService.deletePost(id).subscribe({
      next: () => {
        window.alert('BlogPost deleted succesfully!');
        this.blogPosts$ = this.blogPostService.getPosts();
      },
      error: () => {
        window.alert('Failed to delete the post.');
      }
    });
  }

}

