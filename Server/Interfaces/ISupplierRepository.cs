using Server.Dtos.Supplier;
using Server.Models;

namespace Server.Interfaces
{
    public interface ISupplierRepository : IRepository<Supplier>
    {
        Task<Supplier> Update(int id, UpdateSupplierDtos obj);
        Task<Supplier> UpdateStatus(int id);
        Task<Supplier> GetById(int id);

    }
}
