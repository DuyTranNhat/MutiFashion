using ecommerce_backend.Dtos.Order;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Chart;
using Server.Dtos.Order;
using Server.Helper;
using Server.Models;

namespace Server.Service.IService
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(int idCustomer, CreateOrderDto orderDto);
        Task<OrderDto> GetCompletedOrderByIDAsync(int id);
        Task<QueryObject<OrderDto>> GetOrdersAsync(int page, int limit);
        Task<bool> UpdateStatusAsync(int orderID, UpdateStatusDto updateStatus);
        Task<QueryObject<OrderDto>> GetOrdersByCusAsync(string id, int page, int limit);

        Task<List<TopVariant>> GetListTopVariant(int top, DateTime startDate, DateTime endDate);
        Task<QueryObject<GetListVariantChart>> GetListVariantInRange( DateTime startDate, DateTime endDate,int page,int limit);

        Task<List<YearReport>> GetListOrderMonthly(int year);
        Task<QueryObject<Order>> GetListOrderYear(int year, int page,int limit);

    }
}
