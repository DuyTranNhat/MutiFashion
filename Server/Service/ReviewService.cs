using Server.Dtos.Review;
using Server.Dtos.Supplier;
using Server.Helper;
using Server.Mapper;
using Server.Models;
using Server.Repository;
using Server.Repository.IRepository;
using Server.Service.IService;

namespace Server.Service
{
    public class ReviewService : IReviewService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ReviewService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ProductReviewDTO> CreateAsync(CreatedReviewDTO createdReview)
        {
            var createdReviewModel = createdReview.ToReviewFromCreateDto();
            await _unitOfWork.ProductReview.AddAsync(createdReviewModel);
            await _unitOfWork.SaveAsync();

            var createdResult = await getByIDAsync(createdReviewModel.ReviewId);
            return createdResult;
        }

        public async Task<ProductReviewDTO> getByIDAsync(int id)
        {
            var productReview = await _unitOfWork.ProductReview.GetAsync(r 
                => r.ReviewId == id, includeProperties: "Customer");

            if (productReview == null) return null;

            return productReview.ToProductReviewDTO();
        }

        public async Task<QueryObject<ProductReviewDTO>> GetReviewByProductAsync(int idPro, int page, int limit)
        {
            var productReviews =  await _unitOfWork.ProductReview.GetAllAsync
                (p => p.ProductId == idPro, includeProperties: "Customer");

            var queryReviews = productReviews.Select(r => r.ToProductReviewDTO()).FilterPage(page, limit);
            return queryReviews;
        }
    }
}
