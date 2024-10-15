using Server.Dtos.Supplier;
using Server.Models;

namespace Server.Service.IService
{
    public interface ISupplierService
    {
        Task<SupplierDto> CreateAsync(CreateSupplierDto supplierDto);
        Task<List<SupplierDto>> GetAllAsync();
        Task<SupplierDto> getByIDAsync(int id);
        Task<SupplierDto> UpdateAsync(int id, UpdateSupplierDtos supplierDto);
        Task<SupplierDto> UpdateStatusAsync(int id);
    }
}
