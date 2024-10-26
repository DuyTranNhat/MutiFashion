using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Cart
{
    public class CreateCartDto
    {
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int VariantId { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; } = 1;
        public DateTime DateAdded { get; set; } = DateTime.Now;
    }
}
