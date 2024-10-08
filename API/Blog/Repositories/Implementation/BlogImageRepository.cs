using Blog.Data;
using Blog.Models.Domain;
using Blog.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Blog.Repositories.Implementation
{
    public class BlogImageRepository : IBlogImageRepository
    {
        private readonly ApplicationDbContext _context;

        public BlogImageRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BlogImage>> GetAllImages()
        {
            return await _context.BlogImages.ToListAsync();
        }


        public async Task SaveImage(BlogImage image)
        {
            await _context.BlogImages.AddAsync(image);
            await _context.SaveChangesAsync();
        }

    }
}
