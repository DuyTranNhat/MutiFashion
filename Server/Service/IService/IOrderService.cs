using ecommerce_backend.Dtos.Order;
using Server.Dtos.Order;

namespace Server.Service.IService
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(int idCustomer, CreateOrderDto orderDto);
        Task<OrderDto> GetCompletedOrderByIDAsync(int id);
    }
}
