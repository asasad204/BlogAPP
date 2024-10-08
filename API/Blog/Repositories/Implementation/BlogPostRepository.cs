using Blog.Data;
using Blog.Models.Domain;
using Blog.Repositories.Interface;
using Microsoft.EntityFrameworkCore;


namespace Blog.Repositories.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext _context;

        public BlogPostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BlogPost>> GetAllBlogPosts()
        {
            return await _context.BlogPosts
                .Include(bp => bp.Categories) 
                .ToListAsync();
        }

        public async Task<BlogPost> GetBlogPostById(Guid id)
        {
            return await _context.BlogPosts
                .Include(bp => bp.Categories) // Include Categories
                .FirstOrDefaultAsync(bp => bp.Id == id);
        }

        public async Task<BlogPost> AddBlogPost(BlogPost blogPost)
        {
            // Attach the categories if they already exist in the database
            foreach (var category in blogPost.Categories)
            {
                _context.Categories.Attach(category);
            }

            _context.BlogPosts.Add(blogPost);
            await _context.SaveChangesAsync();
            
            return blogPost;
        }

        public async Task<BlogPost> UpdateBlogPost(BlogPost blogPost)
        {
            var existingBlogPost = await _context.BlogPosts
                .Include(bp => bp.Categories) // Include Categories
                .FirstOrDefaultAsync(bp => bp.Id == blogPost.Id);

            if (existingBlogPost == null)
            {
                throw new KeyNotFoundException("BlogPost not found.");
            }

            // Update the properties of the existing BlogPost
            existingBlogPost.Title = blogPost.Title;
            existingBlogPost.ShortDescription = blogPost.ShortDescription;
            existingBlogPost.Content = blogPost.Content;
            existingBlogPost.FeaturedImageURL = blogPost.FeaturedImageURL;
            existingBlogPost.URLHandle = blogPost.URLHandle;
            existingBlogPost.PublishedDate = blogPost.PublishedDate;
            existingBlogPost.Author = blogPost.Author;
            existingBlogPost.IsVisible = blogPost.IsVisible;

            // Update categories
            existingBlogPost.Categories.Clear();
            foreach (var category in blogPost.Categories)
            {
                _context.Categories.Attach(category);
                existingBlogPost.Categories.Add(category);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.BlogPosts.Any(e => e.Id == blogPost.Id))
                {
                    throw new KeyNotFoundException("BlogPost not found.");
                }
                else
                {
                    throw;
                }
            }

            return existingBlogPost;
        }

        public async Task<bool> DeleteBlogPost(Guid id)
        {
            var blogPost = await _context.BlogPosts.FindAsync(id);
            if (blogPost == null)
            {
                return false;
            }

            _context.BlogPosts.Remove(blogPost);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<BlogPost> GetBlogPostByUrlHandleAsync(string urlHandle)
        {
            return await _context.BlogPosts.FirstOrDefaultAsync(bp => bp.URLHandle == urlHandle);
        }

        public async Task<bool> IsUrlHandleUniqueAsync(string urlHandle)
        {
            return !await _context.BlogPosts.AnyAsync(bp => bp.URLHandle == urlHandle);
        }

    }
}
