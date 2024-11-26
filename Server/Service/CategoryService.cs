using Server.Dtos.Category;
using Server.Helper;
using Server.Mapper;
using Server.Models;
using Server.Repository;
using Server.Repository.IRepository;
using Server.Service.IService;

namespace Server.Service
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CategoryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CategoryDto> CreateAsync(CreateCategoryDto categoryCreateDto)
        {
            Category category = categoryCreateDto.ToCategoryFromCreateDto();
            await _unitOfWork.Category.AddAsync(category);
            await _unitOfWork.SaveAsync();
            return category.ToCategoryDto();
        }

        public async Task<IEnumerable<CategoryDto>> GetActiveCategoriesAsync()
        {
            var activeCategories = await _unitOfWork.Category.GetAllAsync(c => c.ActiveStatus ?? true);
            if (activeCategories == null) return null;
            var categoriesDto = activeCategories.Select(c => c.ToCategoryDto()).ToList();
            return categoriesDto;
        }

        public async Task<CategoryDto?> getByIDAsync(int id)
        {
            Category? categoryExisting = await _unitOfWork.Category.GetAsync(c => c.CategoryId == id);
            if (categoryExisting != null)
                return categoryExisting.ToCategoryDto();
            
            return null;
        }
        
        public async Task<QueryObject<CategoryDto>> GetCategoriesAsync(int page, int limit)
        {
            var categories = await _unitOfWork.Category.GetAllAsync(includeProperties: "Products");
            var categoriesDto = categories.Select(c =>
                c.ToCategoryDto()).FilterPage(page, limit);
            return categoriesDto;
        }

        public async Task<CategoryDto> UpdateAsync(int id, UpdateCategoryDto updateCategoryDto)
        {
            var categoryRS = await _unitOfWork.Category.UpdateAsync(id, updateCategoryDto);
            if (categoryRS == null) return null;
            return categoryRS.ToCategoryDto();
        }

        public async Task<CategoryDto?> UpdateStatusAsync(int id)
        {
            Category? existingCategory = await _unitOfWork.Category.UpdateStatusAsync(id);
            if (existingCategory == null) return null;
            return existingCategory.ToCategoryDto();
        }
    }
}
