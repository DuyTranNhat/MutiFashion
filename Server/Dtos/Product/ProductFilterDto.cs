namespace Server.Dtos.Product
{
    public class ProductSearchDto
    {
        public string? key { get; set; }
    }

    public class VariantFilterDto
    {
        public string? SkuId { get; set; }
        public int? CategoryID { get; set; }
        public int? SupplierID { get; set; }
        public string? keyWord { get; set; }
        public decimal? ToPrice { get; set; }
        public decimal? FromPrice { get; set; }
    }
}
