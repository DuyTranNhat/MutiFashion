using ecommerce_backend.Dtos.Order;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        private readonly MutiFashionContext _db;
        public OrderRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task UpdateStatusAsync(int orderID, UpdateStatusDto updateStatus)
        {
            var orderExisting = await _db.Orders.FirstOrDefaultAsync(o => o.OrderId == orderID);
            orderExisting.Status = updateStatus.StatusOrder;
            await _db.SaveChangesAsync();
        }
    }
}
