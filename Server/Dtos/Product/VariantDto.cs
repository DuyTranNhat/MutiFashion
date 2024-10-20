using Server.Models;

namespace Server.Dtos.Product
{
    public class VariantDto
    {
        public int VariantId { get; set; }
        public int ProductId { get; set; }
        public bool Status { get; set; }
        public int Quantity { get; set; }
        public decimal SalePrice { get; set; }
        public string ProductName { get; set; }
        public string SkuId { get; set; } = null!;
        public string baseImage { get; set; }
        public virtual ICollection<VariantImageDto> Images { get; set; }
        public virtual ICollection<VariantValueDto> VariantValues { get; set; } = new List<VariantValueDto>();
    }

    public class VariantValueDto
    {
        public int ValueId { get; set; }
        public string Value { get; set; }
        public int AttributeID { get; set; }
        public string AttributeName { get; set; }
    }
    public class VariantImageDto
    {
        public int ImageId { get; set; }

        public int VariantId { get; set; }

        public string ImageUrl { get; set; }
    }
}
