using Server.Dtos.Category;
using Server.Dtos.Review;
using Server.Dtos.Supplier;
using Server.Helper;
using Server.Models;

namespace Server.Service.IService
{
    public interface IReviewService
    {
        Task<ProductReviewDTO> CreateAsync(CreatedReviewDTO createdReview);
        Task<ProductReviewDTO> getByIDAsync(int id);
        Task<QueryObject<ProductReviewDTO>> GetReviewByProductAsync(int idPro, int page, int limit);
    }
}
