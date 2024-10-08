import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blogposts/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blogposts/add-blogpost/add-blogpost.component';
import { EditBlogPostComponent } from './features/blogposts/edit-blog-post/edit-blog-post.component';
import { MarkdownEditorComponent } from './features/blogposts/markdown-editor/markdown-editor.component';
import { BlogDetailsComponent } from './features/blogposts/blog-details/blog-details.component';
import { HomeComponent } from './features/blogposts/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AddCategoryComponent,
    CategoryListComponent,
    EditCategoryComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    EditBlogPostComponent,
    MarkdownEditorComponent,
    BlogDetailsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
