using Server.Dtos.Product;
using Server.Helper;

namespace Server.Service.IService
{
    public interface IProductService
    {
        Task<QueryObject<ProductDto>> GetProductsAsync(int page, int limit);
        Task<int> handleGenerateVariantAsync(CreateProductWithVariantsDto dto);
        Task<int> handleUploadAsync(int idProduct, UploadRequestDto uploadDto);
        Task<List<ProductDto>> searchByKeyAsync(ProductSearchDto productSearch);
        public List<Dictionary<int, string>> GenerateCombinations(List<List<string>> optionCombinations);
    }
}
