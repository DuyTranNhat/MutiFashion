using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Category;
using Server.Dtos.Supplier;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly MutiFashionContext _db;
        public CategoryRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Category> UpdateAsync(int id, UpdateCategoryDto obj)
        {
            var existingCategory = await _db.Categories.
                FirstOrDefaultAsync(item => item.CategoryId == id);

            if (existingCategory == null)
                return null;
            
            existingCategory.Name = obj.Name;
            await _db.SaveChangesAsync();
            return existingCategory;
        }

        public async Task<Category> UpdateStatusAsync(int id)
        {
            var existingCategory = await _db.Categories.
               FirstOrDefaultAsync(item => item.CategoryId == id);

            if (existingCategory == null) return null;
            existingCategory.ActiveStatus = !existingCategory.ActiveStatus;
            await _db.SaveChangesAsync();
            return existingCategory;
        }
    }
}
