using Server.Dtos.Product;
using Server.Helper;
using Server.Models;

namespace Server.Service.IService
{
    public interface IVariantService
    {
        Task<IEnumerable<VariantImageDto>> getImagesByIDVariantAsync(int variantID);
        Task<QueryObject<VariantDto>> GetVariantsAsync(int page, int limit);
        Task<IEnumerable<Image>> UploadListImgAsync(UploadListRequestDto imageRequest, int variantID);
    }
}
