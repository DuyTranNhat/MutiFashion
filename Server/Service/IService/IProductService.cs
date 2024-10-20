using Server.Dtos.Product;

namespace Server.Service.IService
{
    public interface IProductService
    {
        public List<Dictionary<int, string>> GenerateCombinations(List<List<string>> optionCombinations);
        Task<object> handleGenerateVariantAsync(CreateProductWithVariantsDto dto);
        Task<ProductDto> handleUploadAsync(int idProduct, IFormFile image);
    }
}
