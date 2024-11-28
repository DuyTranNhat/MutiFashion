using ecommerce_backend.Dtos.Order;
using Server.Dtos.Chart;
using Server.Helper;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task UpdateStatusAsync(int orderID, UpdateStatusDto updateStatus);

        Task<List<TopVariant>> ChartTopData(int top, string startDate, string endDate);
        Task<List<GetListVariantChart>> GetListVariantSortByTotalQuantity(string startDate, string endDate);
        Task<List<YearReport>> GetListVaritantMonthlyAsync(int year);

        //Task<QueryObject<Order>> GetListOrderYear (int year);


    }
}
