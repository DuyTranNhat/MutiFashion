using Server.Dtos.Review;
using Server.Dtos.Supplier;
using Server.Models;

namespace Server.Mapper
{
    public static class ReviewMapper
    {
        public static ProductReviewDTO ToProductReviewDTO(this ProductReview productReview)
        {
            return new ProductReviewDTO
            {
                Comment = productReview.Comment,
                ReviewId = productReview.ReviewId,
                ReviewDate = productReview.ReviewDate,
                Customer = productReview.Customer.ToCustomerDto(),
            };
        }

        public static ProductReview ToReviewFromCreateDto(this CreatedReviewDTO createdReview)
        {
            return new ProductReview
            {
                Comment = createdReview.Comment,
                ProductId = createdReview.ProductId,
                CustomerId = createdReview.CustomerId,
                ReviewDate = createdReview.ReviewDate,
            };
        }
    }
}
