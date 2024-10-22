using Server.Dtos.Supplier;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface ISupplierRepository : IRepository<Supplier>
    {
        Task<Supplier> UpdateAsync(int id, UpdateSupplierDto supplierDto);
        Task<Supplier> UpdateStatus(int id);
    }
}
