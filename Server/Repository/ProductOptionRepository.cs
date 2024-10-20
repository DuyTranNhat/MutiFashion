using Server.Data;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class ProductOptionRepository : Repository<ProductOption>, IProductOptionRepository
    {
        public ProductOptionRepository(MutiFashionContext db) : base(db)
        {
        }
    }
}
