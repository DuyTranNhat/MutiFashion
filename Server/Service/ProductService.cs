using ecommerce_backend.Mappers;
using Microsoft.EntityFrameworkCore;
using Server.Dtos.Product;
using Server.Extensions;
using Server.Helper;
using Server.Mapper;
using Server.Models;
using Server.Repository.IRepository;
using Server.Service.IService;
using System.Linq;

namespace Server.Service
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;

        public ProductService(IUnitOfWork unitOfWork, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
        }

        public async Task<List<ProductDto>> searchByKeyAsync(ProductSearchDto productSearch)
        {
            var products = await _unitOfWork.Product.GetAllAsync(includeProperties: "Category");
            products = products.AsQueryable().AsNoTracking();
            if (!string.IsNullOrWhiteSpace(productSearch.key))
            {
                var normalizedKey = productSearch.key.RemoveVietnameseDiacritics().ToLower();
                products = products.Where(p =>
                p.Name.RemoveVietnameseDiacritics().ToLower().Contains(normalizedKey)
                || p.Category.Name.ToLower().RemoveVietnameseDiacritics().Contains(normalizedKey));
            }
            var productsDTO = products.Select(p => p.ToProductDTO()).ToList();
            return productsDTO;
        }

        public async Task<QueryObject<ProductDto>> GetProductsAsync(int page, int limit)
        {
            var listProduct = await _unitOfWork.Product.GetAllAsync(includeProperties:
                                "Variants,Category,ProductOptions.Option.Values");
            var productQuery = listProduct.Select(p => p.ToProductDTO()).FilterPage(page, limit);
            return productQuery;
        }

        public async Task<int> handleUploadAsync(int idProduct, UploadRequestDto uploadDto)
        {
            string imageUrl = null;
            if (uploadDto.ImageFile != null)
            {
                await _imageService.SetDirect("images/product");
                imageUrl = await _imageService.HandleImageUploadAsync(uploadDto.ImageFile);
            }
            var result = await _unitOfWork.Product.UpdateImageAsync(idProduct, imageUrl);
            return result;
        }

        public List<Dictionary<int, string>> GenerateCombinations(List<List<string>> optionCombinations)
        {
            // khởi tạo DS tổ hợp
            var combinations = new List<Dictionary<int, string>>();
            //Tạo tổ hợp
            GenerateCombinationsRecursive(optionCombinations, 0, new Dictionary<int, string>(), combinations);
            return combinations;
        }

        public async Task<int> handleGenerateVariantAsync(CreateProductWithVariantsDto dto)
        {
            //1 Thêm Product

            var product = dto.ToProductFromCreate();
            await _unitOfWork.Product.AddAsync(product);
            await _unitOfWork.SaveAsync();

            //Xử lý thêm Các option value
            List<List<string>> optionCombinations = new List<List<string>>();

            foreach (var optionDto in dto.Options)
            {
                var option = await _unitOfWork.Option.GetAsync(o =>
                o.Name.ToLower() == optionDto.OptionName.ToLower());

                if (option == null)
                {
                    option = new Option
                    {
                        Name = optionDto.OptionName,
                        ActiveStatus = true
                    };
                    await _unitOfWork.Option.AddAsync(option);
                    await _unitOfWork.SaveAsync();
                }

                var productOption = new ProductOption
                {
                    ProductId = product.ProductId,
                    OptionId = option.OptionId
                };
                await _unitOfWork.ProductOption.AddAsync(productOption);
                await _unitOfWork.SaveAsync();

                List<string> optionValues = new List<string>();

                foreach (var valueName in optionDto.Values)
                {
                    var value = await _unitOfWork.Value.GetAsync(v =>
                        v.Value1 == valueName && v.OptionId == option.OptionId);
                    if (value == null)
                    {
                        value = new Value
                        {
                            OptionId = option.OptionId,
                            Value1 = valueName
                        };
                        await _unitOfWork.Value.AddAsync(value);
                        await _unitOfWork.SaveAsync();
                    }

                    optionValues.Add(valueName);
                }

                optionCombinations.Add(optionValues);
            }

            // 3. Sinh tổ hợp của các giá trị (ví dụ: 3 màu * 3 size = 9 biến thể)
            var variantCombinations = GenerateCombinations(optionCombinations);


            // 4. Tạo các biến thể dựa trên tổ hợp giá trị
            foreach (var combination in variantCombinations)
            {
                var variant = new Variant
                {
                    ProductId = product.ProductId,
                    Quantity = 100,
                    SalePrice = dto.SalePrice,
                    SkuId = Guid.NewGuid().ToString(),
                    Status = true
                };

                await _unitOfWork.Variant.AddAsync(variant);
                await _unitOfWork.SaveAsync();

                foreach (var optionValuePair in combination)
                {
                    var optionId = optionValuePair.Key;
                    var valueName = optionValuePair.Value;

                    var option = await _unitOfWork.Option.GetAsync(o
                        => o.OptionId == optionId);
                    var value = await _unitOfWork.Value.GetAsync(v
                        => v.Value1 == valueName && v.OptionId == optionId);

                    if (value != null && option != null)
                    {
                        var variantValue = new VariantValue
                        {
                            ProductId = product.ProductId,
                            VariantId = variant.VariantId,
                            OptionId = option.OptionId,
                            ValueId = value.ValueId
                        };
                        await _unitOfWork.VariantValue.AddAsync(variantValue);
                        await _unitOfWork.SaveAsync();
                    }
                }
                await _unitOfWork.SaveAsync();
            }

            return product.ProductId;
        }

        private async void GenerateCombinationsRecursive(
            List<List<string>> optionCombinations,
            int index,
            Dictionary<int, string> currentCombination,
            List<Dictionary<int, string>> combinations)
        {
            if (index == optionCombinations.Count)
            {
                combinations.Add(new Dictionary<int, string>(currentCombination));
                return;
            }

            var optionValues = optionCombinations[index];

            foreach (var optionValue in optionValues)
            {
                int optionId = await GetOptionId(optionValue);
                currentCombination[optionId] = optionValue;

                GenerateCombinationsRecursive(optionCombinations, index + 1, currentCombination, combinations);

                currentCombination.Remove(optionId);
            }
        }

        private async Task<int> GetOptionId(string optionValue)
        {
            var option = await _unitOfWork.Option.GetAsync(o =>
            o.Values.Select(v => v.Value1).Contains(optionValue));
            return option?.OptionId ?? 0;
        }
    }
}
