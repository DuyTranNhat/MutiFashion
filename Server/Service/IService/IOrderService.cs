using ecommerce_backend.Dtos.Order;
using Server.Dtos.Order;

namespace Server.Service.IService
{
    public interface IOrderService
    {
        //public Task<OrderDto> GetCompletedOrderByIDAsync(int orderId);
        public Task<OrderDto> CreateOrderAsync(int idCustomer, CreateOrderDto orderDto);

    }
}
