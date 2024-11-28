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

        //public Task CreateAsync(CreatedReviewDTO createdReview)
        //{
        //    var rs = _unitOfWork.a
        //}
    }
}
