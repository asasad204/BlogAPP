

export interface EditBlogPostRequest {
    title: string;
    shortDescription: string;
    content: string;
    featuredImageURL: string;
    urlHandle: string;
    publishedDate: Date;
    author: string;
    isVisible: boolean;
    categories: string[];
  }
  