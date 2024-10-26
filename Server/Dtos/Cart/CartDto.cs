using Server.Dtos.Product;

namespace Server.Dtos.Cart
{
    public class CartDto
    {   
        public int CartId { get; set; }
        public int Quantity { get; set; }
        public int CustomerId { get; set; }
        public VariantDto Variant { get; set; }
        public decimal totalPrice => Quantity * Variant.SalePrice;
        public DateTime DateAdded { get; set; }
    }
}
