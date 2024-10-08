using Blog.Models.Domain;
using Blog.Models.DTO;
using Blog.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;


namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostRepository _blogPostRepository;
        private readonly ICategoryRepository _categoryRepository;

        public BlogPostsController(IBlogPostRepository blogPostRepository, ICategoryRepository categoryRepository)
        {
            _blogPostRepository = blogPostRepository;
            _categoryRepository = categoryRepository;
        }

        // GET: api/BlogPosts
        [HttpGet]
        public async Task<IEnumerable<BlogPostDTO>> GetBlogPosts()
        {
            var blogPosts = await _blogPostRepository.GetAllBlogPosts();
            return blogPosts.Select(bp => new BlogPostDTO
            {
                Id = bp.Id,
                Title = bp.Title,
                ShortDescription = bp.ShortDescription,
                Content = bp.Content,
                FeaturedImageURL = bp.FeaturedImageURL,
                URLHandle = bp.URLHandle,
                PublishedDate = bp.PublishedDate,
                Author = bp.Author,
                IsVisible = bp.IsVisible,
                Categories = bp.Categories.Select(c => new CategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    URLHandle = c.URLHandle
                }).ToList()
            });
        }

        // GET: api/BlogPosts/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<BlogPostDTO>> GetBlogPost(Guid id)
        {
            var blogPost = await _blogPostRepository.GetBlogPostById(id);

            if (blogPost == null)
            {
                return NotFound();
            }

            return new BlogPostDTO
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeaturedImageURL = blogPost.FeaturedImageURL,
                URLHandle = blogPost.URLHandle,
                PublishedDate = blogPost.PublishedDate,
                Author = blogPost.Author,
                IsVisible = blogPost.IsVisible,
                Categories = blogPost.Categories.Select(c => new CategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    URLHandle = c.URLHandle
                }).ToList()
            };
        }

        // POST: api/BlogPosts
        [HttpPost]
        public async Task<ActionResult<BlogPostDTO>> PostBlogPost(CreateBlogPostDTO createBlogPostDTO)
        {
            if (!await _blogPostRepository.IsUrlHandleUniqueAsync(createBlogPostDTO.URLHandle))
            {
                return BadRequest("The URL handle is already taken.");
            }
            var categories = new List<Category>();

            foreach (var categoryId in createBlogPostDTO.Categories)
            {
                var category = await _categoryRepository.GetCategoryById(categoryId);
                if (category != null)
                {
                    categories.Add(category);
                }
            }

            var blogPost = new BlogPost
            {
                Id = Guid.NewGuid(),
                Title = createBlogPostDTO.Title,
                ShortDescription = createBlogPostDTO.ShortDescription,
                Content = createBlogPostDTO.Content,
                FeaturedImageURL = createBlogPostDTO.FeaturedImageURL,
                URLHandle = createBlogPostDTO.URLHandle,
                PublishedDate = createBlogPostDTO.PublishedDate,
                Author = createBlogPostDTO.Author,
                IsVisible = createBlogPostDTO.IsVisible,
                Categories = categories
            };

            await _blogPostRepository.AddBlogPost(blogPost);

            var blogPostDTO = new BlogPostDTO
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeaturedImageURL = blogPost.FeaturedImageURL,
                URLHandle = blogPost.URLHandle,
                PublishedDate = blogPost.PublishedDate,
                Author = blogPost.Author,
                IsVisible = blogPost.IsVisible,
                Categories = blogPost.Categories.Select(c => new CategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    URLHandle = c.URLHandle
                }).ToList()
            };

            return CreatedAtAction(nameof(GetBlogPost), new { id = blogPostDTO.Id }, blogPostDTO);
        }


        // PUT: api/BlogPosts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogPost(Guid id, CreateBlogPostDTO createBlogPostDTO)
        {
            var categories = new List<Category>();

            foreach (var categoryId in createBlogPostDTO.Categories)
            {
                var category = await _categoryRepository.GetCategoryById(categoryId);
                if (category != null)
                {
                    categories.Add(category);
                }
            }

            var blogPost = new BlogPost
            {
                Id = id,
                Title = createBlogPostDTO.Title,
                ShortDescription = createBlogPostDTO.ShortDescription,
                Content = createBlogPostDTO.Content,
                FeaturedImageURL = createBlogPostDTO.FeaturedImageURL,
                URLHandle = createBlogPostDTO.URLHandle,
                PublishedDate = createBlogPostDTO.PublishedDate,
                Author = createBlogPostDTO.Author,
                IsVisible = createBlogPostDTO.IsVisible,
                Categories = categories
            };

            await _blogPostRepository.UpdateBlogPost(blogPost);

            return NoContent();
        }


        // DELETE: api/BlogPosts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPost(Guid id)
        {
            var result = await _blogPostRepository.DeleteBlogPost(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet("/blog/{urlHandle}")]
        public async Task<IActionResult> GetBlogPostByUrlHandle(string urlHandle)
        {
            var blogPost = await _blogPostRepository.GetBlogPostByUrlHandleAsync(urlHandle);
            if (blogPost == null)
            {
                return NotFound();
            }
            return Ok(blogPost);
        }



    }
}
