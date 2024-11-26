using ecommerce_backend.Dtos.Order;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Order;
using Server.Helper;

namespace Server.Service.IService
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(int idCustomer, CreateOrderDto orderDto);
        Task<OrderDto> GetCompletedOrderByIDAsync(int id);
        Task<QueryObject<OrderDto>> GetOrdersAsync(int page, int limit);
        Task<bool> UpdateStatusAsync(int orderID, UpdateStatusDto updateStatus);
        Task<QueryObject<OrderDto>> GetOrdersByCusAsync(string id, int page, int limit);
    }
}
