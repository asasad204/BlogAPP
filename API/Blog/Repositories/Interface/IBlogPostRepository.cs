using Blog.Models.Domain;

namespace Blog.Repositories.Interface
{
    public interface IBlogPostRepository
    {
        Task<IEnumerable<BlogPost>> GetAllBlogPosts();
        Task<BlogPost> GetBlogPostById(Guid id);
        Task<BlogPost> AddBlogPost(BlogPost blogPost);
        Task<BlogPost> UpdateBlogPost(BlogPost blogPost);
        Task<bool> DeleteBlogPost(Guid id);
        Task<BlogPost> GetBlogPostByUrlHandleAsync(string urlHandle);
        Task<bool> IsUrlHandleUniqueAsync(string urlHandle);
    }
}
