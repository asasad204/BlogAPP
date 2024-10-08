import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blogposts/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blogposts/add-blogpost/add-blogpost.component';
import { EditBlogPostComponent } from './features/blogposts/edit-blog-post/edit-blog-post.component';
import { BlogDetailsComponent } from './features/blogposts/blog-details/blog-details.component';
import { HomeComponent } from './features/blogposts/home/home.component';

const routes: Routes = [
  //{ path: 'home', component: HomeComponent },
  { path: 'admin/categories/add', component: AddCategoryComponent },
  { path: 'admin/categories', component: CategoryListComponent },
  { path: 'admin/categories/edit/:id', component: EditCategoryComponent },
  { path: 'admin/blogposts', component: BlogpostListComponent },
  { path: 'admin/blogposts/add', component: AddBlogpostComponent },
  { path: 'admin/blogposts/edit/:id', component: EditBlogPostComponent },
  { path: 'blog/:urlHandle', component: BlogDetailsComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
