import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostsService } from '../services/blogposts.service';
import { BlogPost } from '../models/blogpost.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blogPost!: BlogPost;
  featuredImageSrc: string | null = null;

  constructor(private route: ActivatedRoute, private blogService: BlogPostsService, private http: HttpClient) {}

  ngOnInit(): void {
    const urlHandle = this.route.snapshot.paramMap.get('urlHandle')!;
    this.blogService.getBlogPostByUrlHandle(urlHandle).subscribe(post => {
      this.blogPost = post;
      this.validateImageURL(this.blogPost.featuredImageURL);
    });
  }

  validateImageURL(url: string | null): void {
    if (!url || !url.trim()) {
      this.featuredImageSrc = null;
      return;
    }

    // Simple validation for URL format (basic check)
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      this.featuredImageSrc = null;
      return;
    }

    this.http.head(url, { observe: 'response' }).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.featuredImageSrc = url;
        } else {
          this.featuredImageSrc = null;
        }
      },
      error: () => {
        this.featuredImageSrc = null;
      }
    });
  }
}
