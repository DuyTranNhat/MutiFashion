using Server.Dtos.Supplier;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces;
using Server.Models;

namespace Server.Repository
{
    public class SupplierRepository : Repository<Supplier>, ISupplierRepository
    {
        private readonly MutiFashionContext _db;
        public SupplierRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Supplier> GetById(int id)
        {
            var existingSupplier = await _db.Suppliers.FirstOrDefaultAsync(item => item.SupplierId == id);

            if (existingSupplier == null)
            {
                return null;
            }

            return existingSupplier;
        }

        //Update
        public async Task<Supplier> Update(int id, UpdateSupplierDtos obj)
        {
            var existingSupplier = await _db.Suppliers.FirstOrDefaultAsync(item => item.SupplierId == id);

            if (existingSupplier == null)
            {
                return null;
            }

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

            if (existingSupplier == null)
            {
                return null;
            }

            existingSupplier.Status = !existingSupplier.Status;

            await _db.SaveChangesAsync();

            return existingSupplier;
        }
    }
}
