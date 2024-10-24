using Server.Dtos.Option;
using Server.Dtos.Product;
using Server.Mapper;
using Server.Mappers;
using Server.Models;
using System;

namespace ecommerce_backend.Mappers
{
    public static class ProductMapper
    {
        public static Product ToProductFromCreate(this CreateProductWithVariantsDto productDto)
        {
            return new Product
            {
                Name = productDto.Name,
                Saleprice = productDto.SalePrice,
                CategoryId = null,
                SupplierId = productDto.SupplierId,
                Description = productDto.Description,
                Status = productDto.Status
            };
        }

        public static ProductDto ToProductDTO(this Product product)
        {
            return new ProductDto
            {
                Name = product.Name,
                Status = product.Status,
                ImageUrl = product.ImageUrl,
                SalePrice = product.Saleprice,
                ProductId = product.ProductId,
                Description = product.Description,
                totalVariant = product.Variants.Count,
                totalPreviews = product.ProductReviews.Count,
                Category = product.Category.ToCategoryDto(),
                ProductOptions = product.ProductOptions.Select(p => p.ToProductOptions()).ToList(),
            };
        }

        public static ProductVariantDto ToProductVariantsDTO(this Product product)
        {
            return new ProductVariantDto
            {
                Name = product.Name,
                ImageUrl= product.ImageUrl,
                ProductId = product.ProductId,
                Description = product.Description,
                totalPreviews = product.ProductReviews.Count,
                CategoryDto = product.Category.ToCategoryDto(),
                Variants = product.Variants.Select(v => v.ToVariantDto()).ToList(),
                Attributes = product.ProductOptions.Select(po => po.ToProductOptions()).ToList(),
            };
        }

        public static ProductOptionsDto ToProductOptions(this ProductOption productOption)
        {
            return new ProductOptionsDto
            {
                AttributeID = productOption.OptionId,
                AttributeName = productOption.Option.Name,
                values = productOption.Option.Values.Select(v => v.ToValueDto()).ToList(),
            };
        }
    }
}
