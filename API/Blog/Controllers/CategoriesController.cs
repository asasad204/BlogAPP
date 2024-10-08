using Blog.Models.Domain;
using Blog.Models.DTO;
using Blog.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }


        [HttpGet]
        public async Task<IEnumerable<CategoryDTO>> GetCategories()
        {
            var categories = await _categoryRepository.GetAllCategories();
            return categories.Select(c => new CategoryDTO
            {
                Id = c.Id,
                Name = c.Name,
                URLHandle = c.URLHandle
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategory(Guid id)
        {
            var category = await _categoryRepository.GetCategoryById(id);

            if (category == null)
            {
                return NotFound();
            }

            return new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                URLHandle = category.URLHandle
            };
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDTO>> PostCategory(CreateCategoryDTO createCategoryDTO)
        {
            var category = new Category
            {
                Id = Guid.NewGuid(),
                Name = createCategoryDTO.Name,
                URLHandle = createCategoryDTO.URLHandle
            };

            await _categoryRepository.AddCategory(category);

            var categoryDTO = new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                URLHandle = category.URLHandle
            };

            return CreatedAtAction(nameof(GetCategory), new { id = categoryDTO.Id }, categoryDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(Guid id, CreateCategoryDTO createCategoryDTO)
        {
            var category = new Category
            {
                Id = id,
                Name = createCategoryDTO.Name,
                URLHandle = createCategoryDTO.URLHandle
            };

            await _categoryRepository.UpdateCategory(category);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var result = await _categoryRepository.DeleteCategory(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
