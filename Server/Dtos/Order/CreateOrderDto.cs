using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Order
{
    public class CreateOrderDto
    {
        [Required]
        public string Address { get; set; } = null!;
        [Required]
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^(03|05|07|08|09)\d{8}$", ErrorMessage = "Số điện thoại không đúng định dạng.")]
        public string? Phone { get; set; }
        public string? PaymentMethod { get; set; }
        public string? ShippingService { get; set; }
        public string? Notes { get; set; }
    }
}