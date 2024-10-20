using Server.Dtos.Option;
using Server.Dtos.Product;
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
                Category = product.Category,
                Description = product.Description,
                ImageUrl = product.ImageUrl,
                ProductId = product.ProductId,
                Status = product.Status,
                totalVariant = product.Variants.Count(),
            };
        }
    }
}
