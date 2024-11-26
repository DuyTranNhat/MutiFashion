using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Product;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class VariantRepository : Repository<Variant>, IVariantRepository
    {
        private readonly MutiFashionContext _db;
        public VariantRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task UpdateAsync(VariantUpdateDto updatedVariant)
        {
            var variant = _db.Variants.Where(x => x.VariantId ==
                updatedVariant.VariantId).Include(v => v.Product).FirstOrDefault();
            variant.Status = updatedVariant.Status;
            variant.Product.Name = updatedVariant.Name;
            variant.Product.Description = updatedVariant.Description;
            await _db.SaveChangesAsync();   
        }

        public async Task UpdateQuantityAsync(int variantID, int quantityDecreased)
        {
            Variant variant = await _db.Variants.FirstOrDefaultAsync(v => v.VariantId == variantID);
            variant.Quantity -= quantityDecreased;
            await _db.SaveChangesAsync();
        }
    }
}
