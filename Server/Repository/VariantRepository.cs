using Microsoft.EntityFrameworkCore;
using Server.Data;
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

        public async Task UpdateQuantityAsync(int variantID, int quantityDecreased)
        {
            Variant variant = await _db.Variants.FirstOrDefaultAsync(v => v.VariantId == variantID);
            variant.Quantity -= quantityDecreased;
            await _db.SaveChangesAsync();
        }
    }
}
