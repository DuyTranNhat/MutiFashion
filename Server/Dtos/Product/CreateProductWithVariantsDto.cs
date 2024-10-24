using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Product
{
    public class CreateProductWithVariantsDto
    {
        public string Name { get; set; }
        public decimal SalePrice { get; set; }
        public int? CategoryId { get; set; }
        public int? SupplierId { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public List<CreateProductOptionDto> Options { get; set; } = new List<CreateProductOptionDto>();
    }

    public class CreateProductOptionDto
    {
        public string OptionName { get; set; }
        public List<string> Values { get; set; } = new List<string>();
    }
}
