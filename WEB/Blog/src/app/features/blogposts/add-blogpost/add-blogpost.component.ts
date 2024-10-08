import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blog-post-request.model';
import { BlogPostsService } from '../services/blogposts.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { BlogImagePost } from '../models/blog-image-post.model';
import { BlogImagesService } from '../services/blog-images.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  blogImages$!: Observable<Array<BlogImagePost>>;
  selectedFile: File | null = null;
  fileName: string = '';
  title: string = '';
  blogPost: AddBlogPostRequest = {
    title: '',
    shortDescription: '',
    content: '',
    featuredImageURL: '',
    urlHandle: '',
    publishedDate: new Date(),
    author: '',
    isVisible: false,
    categories: [] 
  };
  categories: any[] = []; 
  private subscription!: Subscription;
  private uploadSubscription?: Subscription;
  @ViewChild('imageModal') imageModal!: ElementRef;
  markdownContent: string = '';

  constructor(
    private blogPostService: BlogPostsService, 
    private categoriesService: CategoryService,
    private blogImageService: BlogImagesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.blogImages$ = this.blogImageService.getBlogImages();
    
  }

  loadCategories(): void {
    this.subscription = this.categoriesService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  updateMarkdown(content: string): void {
    this.markdownContent = content;
  }

  onSubmit(): void {
    this.subscription = this.blogPostService.addPost(this.blogPost).subscribe(
      response => {
        console.log('Blog post added successfully!', response);
        this.router.navigate(['admin/blogposts']); 
      },
      error => {
        console.error('There was an error adding the blog post!', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.uploadSubscription?.unsubscribe();
  }

  SubmitImageForm(): void {
    if (this.selectedFile && this.fileName && this.title) {
      this.uploadSubscription = this.blogImageService.uploadImage(this.selectedFile, this.fileName, this.title)
        .subscribe({
          next: (response) => {
            console.log(response);
            if (response && response.filePath) {
              this.blogPost.featuredImageURL = response.filePath;
              console.log('Image uploaded successfully:', response.filePath);
              this.blogImages$ = this.blogImageService.getBlogImages();
              
              this.closeModal();
            } else {
              console.error('Upload response does not contain filePath:', response);
            }
          },
          error: (error) => {
            console.error('Error uploading image:', error);
            window.alert('Use an image with an extension that is either .png, .jpg. or .jpeg!');
          }
        });
    } else {
      window.alert('File, file name, or title is missing.!')
      console.error('File, file name, or title is missing.');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onImageClick(url: string | undefined): void {
    this.blogPost.featuredImageURL = url ?? '';
    this.closeModal();
}

private closeModal(): void {
  const modalElement = this.imageModal.nativeElement;
  modalElement.classList.remove('show');
  modalElement.setAttribute('aria-hidden', 'true');
  modalElement.style.display = 'none';

  // Remove the backdrop element
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
// Ensure the button is re-enabled and not affected by focus issues
const uploadButton = document.querySelector('button[data-bs-target="#imageModal"]')  as HTMLElement;;
if (uploadButton) {
    uploadButton.blur(); // Blurring to prevent requiring a double-click
}
  // Remove the 'modal-open' class from the body to enable scrolling
  document.body.classList.remove('modal-open');
  document.documentElement.style.overflow= 'auto';
}
}
