using Server.Dtos.Product;
using Server.Helper;
using Server.Models;

namespace Server.Service.IService
{
    public interface IVariantService
    {
        Task<object> DeleteImageByIDVarAsync(int imageId);
        Task DecreaseQuantityAsync(int variantId, int quantity);
        Task<VariantUpdateDto> GetUpdatedVariant(int variantID);
        Task<bool> UpdateVariantAsync(VariantUpdateDto updatedVariant);
        Task<QueryObject<VariantDto>> GetVariantsAsync(int page, int limit);
        Task<IEnumerable<VariantImageDto>> getImagesByIDVariantAsync(int variantID);
        Task<IEnumerable<Image>> UploadListImgAsync(UploadListRequestDto imageRequest, int variantID);
        Task<QueryObject<VariantDto>> FilterVariantsAsync(VariantFilterDto filterRequest, int page, int limit);
    }
}
