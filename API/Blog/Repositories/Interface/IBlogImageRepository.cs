using Blog.Models.Domain;

namespace Blog.Repositories.Interface
{
    public interface IBlogImageRepository
    {
        Task SaveImage(BlogImage image);

        Task<IEnumerable<BlogImage>> GetAllImages();
    }
}
