using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Category;
using Server.Dtos.Option;
using Server.Dtos.Supplier;
using Server.Service;
using Server.Service.IService;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService) {
            _categoryService = categoryService;
        }

        [HttpGet("getByID/{id:int}")]
        public async Task<IActionResult> GetByID([FromRoute] int id)
        {
            CategoryDto? catogoryExisting = await _categoryService.getByIDAsync(id);
            if (catogoryExisting == null) return NotFound();
            return Ok(catogoryExisting);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDto categoryCreateDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var supplierRS = await _categoryService.CreateAsync(categoryCreateDto);
            return Ok(supplierRS);
        }

        [HttpPut("toggleStatus/{id:int}")]
        public async Task<IActionResult> UpdateStatus([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var categoryUpdated = await _categoryService.UpdateStatusAsync(id);
            if (categoryUpdated == null) return NotFound();
            return Ok(categoryUpdated);
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCategoryDto categoryUpdateDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var categoryRS = await _categoryService.UpdateAsync(id, categoryUpdateDto);
            if (categoryRS == null) return NotFound();
            return Ok(categoryRS);
        }

        [HttpGet("getCategories")]
        public async Task<IActionResult> getCategories([FromQuery] int page = 1, [FromQuery] int limit = 12)
        {
            var categoriesRS = await _categoryService.GetCategoriesAsync(page, limit);
            return Ok(categoriesRS);
        }

    }
}
