using Server.Dtos.Category;
using Server.Dtos.Supplier;
using Server.Models;

namespace Server.Mapper
{
    public static class CategoryMapper
    {
        public static CategoryDto ToCategoryDto(this Category category)
        {
            return new CategoryDto
            {
                Name = category.Name,
                CategoryId = category.CategoryId,
                Quantity = category.Products.Count,
                ActiveStatus = category.ActiveStatus ?? false,
                totalProduct = category.Products.Count,
            };
        }

        public static Category ToCategoryFromCreateDto(this CreateCategoryDto createCategoryDto)
        {
            return new Category
            {
                Name = createCategoryDto.Name,
            };
        }
    }
}
