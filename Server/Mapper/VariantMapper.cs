using Server.Dtos.Product;
using Server.Models;

namespace Server.Mapper
{
    public static class VariantMapper
    {
        public static VariantDto ToVariantDto(this Variant variant)
        {

            return new VariantDto
            {
                
                SkuId = variant.SkuId,
                Status = variant.Status,
                Quantity = variant.Quantity,
                SalePrice = variant.SalePrice,
                VariantId = variant.VariantId,
                ProductId = variant.ProductId,
                ProductName = variant.Product.Name,
                baseImage = variant.Product.ImageUrl,
                Images = variant.Images.Select(image => image.ToVariantImageDto()).ToList(),
                VariantValues = variant.VariantValues.Select(vv => vv.ToVariantValueDto()).ToList(),
            };
        }

        public static VariantUpdateDto ToVariantUpdatedDto(this Variant variant)
        {

            return new VariantUpdateDto
            {
                Status = variant.Status,
                Name = variant.Product.Name,
                VariantId = variant.VariantId,
                Description = variant.Product.Description,
            };
        }

        public static VariantImageDto ToVariantImageDto(this Image img)
        {

            return new VariantImageDto
            {
                ImageId = img.ImageId,
                VariantId = img.VariantId,
                ImageUrl = img.ImageUrl
            };
        }

        public static VariantValueDto ToVariantValueDto(this VariantValue variantValue)
        {
            return new VariantValueDto
            {
                AttributeID = variantValue.OptionId,
                AttributeName = variantValue.ProductOption.Option.Name,
                Value = variantValue.Value.Value1,
                ValueId = variantValue.Value.ValueId,
            };
        }
    }
}
