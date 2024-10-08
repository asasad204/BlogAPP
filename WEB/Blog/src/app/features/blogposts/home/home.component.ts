import { Component, OnInit } from '@angular/core';
import { BlogPostsService } from '../services/blogposts.service';
import { BlogPost } from '../models/blogpost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogPosts: BlogPost[] = [];

  constructor(private blogService: BlogPostsService) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(posts => {
      this.blogPosts = posts;
    });
  }
  isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
  
}
