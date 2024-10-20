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
                imageURL = product.ImageUrl!,
                Id = product.ProductId,
                Description = product.Description
            };
        }
    }
}
