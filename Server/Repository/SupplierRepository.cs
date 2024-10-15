using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Supplier;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class SupplierRepository : Repository<Supplier>, ISupplierRepository
    {
        private readonly MutiFashionContext _db;
        public SupplierRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Supplier> UpdateAsync(int id, UpdateSupplierDtos obj)
        {
            var existingSupplier = await _db.Suppliers.FirstOrDefaultAsync(item => item.SupplierId == id);

            if (existingSupplier == null)
                return null;

            existingSupplier.Name = obj.Name;
            existingSupplier.Email = obj.Email;
            existingSupplier.Phone = obj.Phone;
            existingSupplier.Address = obj.Address;
            existingSupplier.Status = obj.Status;
            existingSupplier.Notes = obj.Notes;

            await _db.SaveChangesAsync();

            return existingSupplier;
        }

        public async Task<Supplier> UpdateStatus(int id)
        {
            var existingSupplier = await _db.Suppliers.FirstOrDefaultAsync(item => item.SupplierId == id);
            if (existingSupplier == null) return null;
            existingSupplier.Status = !existingSupplier.Status;
            await _db.SaveChangesAsync();
            return existingSupplier;
        }
    }
}
