using Server.Dtos.Customer;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos.Review
{
    public class CreatedReviewDTO
    {
        [Required(ErrorMessage = "ProductId is required.")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "CustomerId is required.")]
        public int CustomerId { get; set; }

        [Required(ErrorMessage = "Comment is required.")]

        [MaxLength(500, ErrorMessage = "Comment cannot exceed 500 characters.")]
        public string Comment { get; set; }

        [Required(ErrorMessage = "ReviewDate is required.")]
        public DateTime ReviewDate { get; set; } = DateTime.Now;
    }

    public class ProductReviewDTO
    {
        public int ReviewId { get; set; }

        public int? Rating { get; set; }

        public string? Comment { get; set; }

        public DateTime ReviewDate { get; set; }

        public virtual CustomerDto Customer { get; set; } = null!;
    }
}
