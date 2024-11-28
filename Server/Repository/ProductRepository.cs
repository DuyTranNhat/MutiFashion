using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly MutiFashionContext _db;
        public ProductRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task ToggleStatusyAsync(int idPro)
        {
            var result = await _db.Products.FirstOrDefaultAsync(p => p.ProductId == idPro);
            result.Status = !result.Status;
            await _db.SaveChangesAsync();
        }

        public async Task<int> UpdateImageAsync(int idProduct, string? imageUrl)
        {
            var productExisting = await _db.Products.
                FirstOrDefaultAsync(p => p.ProductId == idProduct);
            if (productExisting != null) productExisting.ImageUrl = imageUrl;
            await _db.SaveChangesAsync();
            return productExisting.ProductId;
        }
    }
}
