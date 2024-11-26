using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;
using Server.Dtos.Product;

namespace ecommerce_backend.Dtos.Order
{
    public class OrderDto
    {
        public int OrderId { get; set; }

        public string CustomerName { get; set; }

        public DateTime OrderDate { get; set; }

        public decimal TotalAmount { get; set; }

        public string? Status { get; set; }

        public string Address { get; set; } = null!;

        public string? Phone { get; set; }

        public string? PaymentMethod { get; set; } 
        
        public string? Notes { get; set; }

        public  List<OrderDetailDto> OrderDetails { get; set; }
    }

    public class OrderDetailDto
    {
        public int OrderDetailId { get; set; }

        public int OrderId { get; set; }

        public VariantDto Variant { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }

    public class UpdateStatusDto
    {
        public string StatusOrder { get; set; }
    }
}