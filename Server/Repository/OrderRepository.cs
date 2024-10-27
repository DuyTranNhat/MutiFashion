using Server.Data;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(MutiFashionContext db) : base(db)
        {
        }
    }
}
