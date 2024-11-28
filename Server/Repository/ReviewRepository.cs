using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Supplier;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class ReviewRepository : Repository<ProductReview>, IReviewRepository
    {
        private readonly MutiFashionContext _db;
        public ReviewRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

    }
}
