﻿using Server.Dtos.Category;
using Server.Dtos.Supplier;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<Category> UpdateStatusAsync(int id);
        Task<Category> UpdateAsync(int id, UpdateCategoryDto updateCategoryDto);
    }
}
