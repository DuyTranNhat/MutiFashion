
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Category;
using Server.Dtos.Option;
using Server.Dtos.Supplier;
using Server.Helper;
using Server.Models;

namespace Server.Service.IService
{
    public interface ICategoryService
    {
        Task<CategoryDto> CreateAsync(CreateCategoryDto categoryDto);
        Task<QueryObject<CategoryDto>> GetCategoriesAsync(int page, int limit);
        Task<CategoryDto> UpdateAsync(int id, UpdateCategoryDto supplierDto);
        Task<CategoryDto?> getByIDAsync(int id);
        Task<CategoryDto?> UpdateStatusAsync(int id);
    }
}
