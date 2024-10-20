using Server.Dtos.Product;
using Server.Helper;

namespace Server.Service.IService
{
    public interface IVariantService
    {
        Task<QueryObject<VariantDto>> GetVariantsAsync(int page, int limit);
    }
}
