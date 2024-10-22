using Server.Models;

namespace Server.Dtos.Product
{
    public class ProductDto
    {
        public int ProductId { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public bool Status { get; set; }

        public string? ImageUrl { get; set; }

        public int totalVariant { get; set; } = 0;

        public virtual Models.Category? Category { get; set; }
    }
}
