using Server.Dtos.Product;
using Server.Helper;
using Server.Mapper;
using Server.Repository;
using Server.Repository.IRepository;
using Server.Service.IService;

namespace Server.Service
{
    public class VariantService : IVariantService
    {
        private readonly IUnitOfWork _unitOfWork;
        public VariantService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<QueryObject<VariantDto>> GetVariantsAsync(int page, int limit)
        {
            var variantList = await _unitOfWork.Variant.GetAllAsync(includeProperties:
                "VariantValues.Value,VariantValues.ProductOption.Option,Images,Product");
            var variantDTO = variantList.Select(v => v.ToVariantDto()).
                AsQueryable().FilterPage(page, limit);
            return variantDTO;
        }
    }
}
