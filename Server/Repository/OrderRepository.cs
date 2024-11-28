using ecommerce_backend.Dtos.Order;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Chart;
using Server.Helper;
using Server.Models;
using Server.Repository.IRepository;
using System.Data;

namespace Server.Repository
{

    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        private readonly MutiFashionContext _db;
        public OrderRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task<List<TopVariant>> ChartTopData(int top, string startDate, string endDate)
        {
            var result = new List<TopVariant>();

            using (var connection = _db.Database.GetDbConnection())
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "[dbo].[GetTopVariant]";
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@startDate", startDate));
                    command.Parameters.Add(new SqlParameter("@endDate", endDate));
                    command.Parameters.Add(new SqlParameter("@top", top));

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            result.Add(new TopVariant
                            {
                                variantId = Convert.ToInt32(reader["variant_id"]),
                                name = reader["name"].ToString(),
                                totalQuantity = Convert.ToInt32(reader["TotalQuantity"])
                            });
                        }
                    }
                }
            }

            return result;
        }

      

        public async Task<List<GetListVariantChart>> GetListVariantSortByTotalQuantity(string startDate, string endDate)
        {
            var result = new List<GetListVariantChart>();

            using (var connection = _db.Database.GetDbConnection())
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "[dbo].[GetListVariantInRangeDate]";
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@startDate", startDate));
                    command.Parameters.Add(new SqlParameter("@endDate", endDate));

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            result.Add(new GetListVariantChart
                            {
                               
                                id = Convert.ToInt32(reader["variant_id"]),
                                name = reader["name"].ToString(),
                                supplierName = reader["supplier_name"].ToString(),
                                salePrice = Convert.ToDouble(reader["saleprice"]),
                                totalQuantity = Convert.ToInt32(reader["TotalQuantity"]),
                            });
                        }
                    }
                }
            }

            return result;
        }

        public async Task<List<YearReport>> GetListVaritantMonthlyAsync(int year)
        {
            var result = new List<YearReport>();

            using (var connection = _db.Database.GetDbConnection())
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "[dbo].[GetMonthlyTotalAmount]";
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@year", year));

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            result.Add(new YearReport
                            {

                                oderMonth = Convert.ToInt32(reader["order_month"]),
                                totalAmount = Convert.ToDouble(reader["order_month"]),
                            });
                        }
                    }
                }
            }

            return result;
        }

        public async Task UpdateStatusAsync(int orderID, UpdateStatusDto updateStatus)
        {
            var orderExisting = await _db.Orders.FirstOrDefaultAsync(o => o.OrderId == orderID);
            orderExisting.Status = updateStatus.StatusOrder;
            await _db.SaveChangesAsync();
        }
    }
}
