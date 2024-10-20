using Server.Dtos.Product;

namespace Server.Service.IService
{
    public interface IProductService
    {
        public List<Dictionary<int, string>> GenerateCombinations(List<List<string>> optionCombinations);
        Task<int> handleGenerateVariantAsync(CreateProductWithVariantsDto dto);
        Task<int> handleUploadAsync(int idProduct, UploadRequestDto uploadDto);
    }
}
