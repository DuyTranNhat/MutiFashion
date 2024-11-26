using ecommerce_backend.Dtos.Order;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task UpdateStatusAsync(int orderID, UpdateStatusDto updateStatus);
    }
}
