using Server.Dtos.Category;
using Server.Dtos.Value;
using Server.Models;

namespace Server.Dtos.Product
{
    public class ProductDto
    {
        public bool Status { get; set; }
        public int ProductId { get; set; }
        public string? ImageUrl { get; set; }
        public decimal? SalePrice { get; set; }
        public string? Description { get; set; }
        public string Name { get; set; } = null!;
        public int totalVariant { get; set; } = 0;
        public int totalPreviews { get; set; } = 0;
        public virtual CategoryDto Category { get; set; }
        public virtual ICollection<ProductOptionsDto> ProductOptions { get; set; } = new List<ProductOptionsDto>();
    }

    public class ProductOptionsDto
    {
        public int AttributeID { get; set; }
        public string AttributeName { get; set; }
        public ICollection<ValueDto> values { get; set; }
    }
}
