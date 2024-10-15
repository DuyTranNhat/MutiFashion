using Server.Dtos.Supplier;
using Server.Mapper;
using Server.Models;
using Server.Repository;
using Server.Repository.IRepository;
using Server.Service.IService;

namespace Server.Service
{
    public class SupplierService : ISupplierService
    {
        private readonly IUnitOfWork _unitOfWork;
        public SupplierService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<SupplierDto> CreateAsync(CreateSupplierDto supplierCreateDto)
        {
            Supplier supplierModel = supplierCreateDto.ToSupplierFromCreateDto();
            await _unitOfWork.Supplier.AddAsync(supplierModel);
            await _unitOfWork.SaveAsync();
            var supplierRS =  await _unitOfWork.Supplier.GetAsync(s => s.SupplierId == supplierModel.SupplierId);
            return supplierRS.ToSupplierDto();
        }

        public async Task<List<SupplierDto>> GetAllAsync()
        {
            var supplierList = await _unitOfWork.Supplier.GetAllAsync();
            var supplierMapper = supplierList.Select(c => c.ToSupplierDto()).ToList();
            return supplierMapper;
        }

        public async Task<SupplierDto?> getByIDAsync(int id)
        {
            Supplier supplierExisting = await _unitOfWork.Supplier.GetAsync(c => c.SupplierId == id);
            if (supplierExisting != null)
                return supplierExisting.ToSupplierDto();
            return null;
        }

        public async Task<SupplierDto> UpdateAsync(int id, UpdateSupplierDtos supplierDto)
        {
            var supplierRS = await _unitOfWork.Supplier.UpdateAsync(id, supplierDto);
            if (supplierRS == null)
                return null;
            return supplierRS.ToSupplierDto();
        }

        public async Task<SupplierDto> UpdateStatusAsync(int id)
        {
            Supplier? existingSupplier = await _unitOfWork.Supplier.UpdateStatus(id);
            if (existingSupplier == null)
                return null;
            return existingSupplier.ToSupplierDto();
        }
    }
}
