using ecommerce_backend.Dtos.Order;
using Server.Dtos.Chart;
using Server.Dtos.Order;
using Server.Exceptions;
using Server.Helper;
using Server.Mapper;
using Server.Models;
using Server.Repository.IRepository;
using Server.Service.IService;

namespace ecommerce_backend.Service
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly ICartService _cartService;
        private readonly ICustomerService _customerService;
        private readonly IVariantService _variantService;


        public OrderService(IUnitOfWork unitOfWork, IVariantService variantService, ICustomerService customerService)
        {
            _unitOfWork = unitOfWork;
            _variantService = variantService;
            _customerService = customerService;
        }

        public async Task<OrderDto> CreateOrderAsync(int customerID, CreateOrderDto orderDto)
        {
            using (var transaction = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var customer = await _unitOfWork.Customer.GetAsync(c => c.CustomerId == customerID)
                        ?? throw new NotFoundException("Customer Not Found");

                    var order = orderDto.ToOrderFromCreate(customerID);
                    await _unitOfWork.Order.AddAsync(order);
                    await _unitOfWork.SaveAsync();

                    var cartList = await _unitOfWork.Cart.GetAllAsync(c => c.CustomerId == customerID);

                    if (!cartList.Any())
                        throw new NotFoundException("Cannot order due to empty cart!");

                    decimal total = 0;

                    foreach (var itemCart in cartList)
                    {
                        var variant = await _unitOfWork.Variant.GetAsync(v => v.VariantId == itemCart.VariantId)
                            ?? throw new NotFoundException("Variant Not Found");

                        await _unitOfWork.OrderDetail.AddAsync(new OrderDetail
                        {
                            OrderId = order.OrderId,
                            VariantId = itemCart.VariantId,
                            Quantity = itemCart.Quantity,
                            Price = variant.SalePrice
                        });



                        total += variant.SalePrice * itemCart.Quantity;

                        await _variantService.DecreaseQuantityAsync(variant.VariantId, itemCart.Quantity);
                    }

                    order.TotalAmount = total;

                    await _unitOfWork.SaveAsync();

                    await _unitOfWork.Cart.RemoveRangeAsync(cartList);

                    await _unitOfWork.SaveAsync();

                    await transaction.CommitAsync();

                    return order.ToOrderDto(customer.Name);
                }
                catch (BadHttpRequestException ex)
                {
                    throw new BadHttpRequestException(ex.Message);
                }
                catch (NotFoundException ex)
                {
                    throw new NotFoundException(ex.Message);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }


        public async Task<OrderDto> GetCompletedOrderByIDAsync(int orderId)
        {
            var order = await _unitOfWork.Order.GetAsync(o => o.OrderId == orderId, 
                includeProperties: "OrderDetails.Variant.VariantValues.Value,Customer" +
                ",OrderDetails.Variant.Product,OrderDetails.Variant.Images,OrderDetails." +
                "Variant.VariantValues.ProductOption.Option")
                ?? throw new BadHttpRequestException("Not found an order id");

            var orderDTO = order.ToOrderDto();
            return orderDTO;
        }

        public async Task<List<YearReport>> GetListOrderMonthly(int year)
        {
            var result  = await _unitOfWork.Order.GetListVaritantMonthlyAsync(year);
            if (result == null) throw new Exception("No record");
            var response = result.ToList();
            return response;
        }

        public async Task<QueryObject<Order>> GetListOrderYear(int year,int page,int limit)
        {
            var result = await _unitOfWork.Order.GetAllAsync(item => item.OrderDate.Year == year);
            if (result == null) throw new Exception("Không tìm thấy dữ liệu");
            var response = result.FilterPage(page, limit);
            
            return response;
        }


        public async Task<List<TopVariant>> GetListTopVariant(int top, DateTime startDate, DateTime endDate)
        {
            
            var start = startDate.ToString("yyyy-MM-dd ");
            start += "00:00:01";
            var end = endDate.ToString("yyyy-MM-dd");
            end += " 23:59:59";
            var listTopVariant = await _unitOfWork.Order.ChartTopData(top,start,end);
            if (listTopVariant == null) throw new Exception("Không có sản phẩm nào được bán");
            return listTopVariant;
        }

        public async Task<QueryObject<GetListVariantChart>> GetListVariantInRange(DateTime startDate, DateTime endDate,int page,int limit)
        {
            var start = startDate.ToString("yyyy-MM-dd ");
            start += "00:00:01";
            var end = endDate.ToString("yyyy-MM-dd");
            end += " 23:59:59";
            var listTopVariant = await _unitOfWork.Order.GetListVariantSortByTotalQuantity(start, end);
            if (listTopVariant == null) throw new Exception("Không có sản phẩm nào được bán");
            return listTopVariant.FilterPage(page,limit);
        }

        public async Task<QueryObject<OrderDto>> GetOrdersAsync(int page, int limit)
        {
            var orders = await _unitOfWork.Order.GetAllAsync(includeProperties:
             "OrderDetails.Variant.VariantValues.Value,Customer,OrderDetails" +
             ".Variant.Product,OrderDetails.Variant.Images,OrderDetails." +
             "Variant.VariantValues.ProductOption.Option");

            var orderQuery = orders.Select(o => o.ToOrderDto()).FilterPage(page, limit);

            return orderQuery;
        }

        public async Task<QueryObject<OrderDto>> GetOrdersByCusAsync(string id, int page, int limit)
        {
            var orders = await _unitOfWork.Order.GetAllAsync(o => o.CustomerId.ToString() == id , includeProperties: 
                "OrderDetails.Variant.VariantValues.Value,Customer,OrderDetails" +
                ".Variant.Product,OrderDetails.Variant.Images,OrderDetails." +
                "Variant.VariantValues.ProductOption.Option");

            var orderQuery = orders.Select(o => o.ToOrderDto()).FilterPage(page, limit);

            return orderQuery;
        }

        public async Task<bool> UpdateStatusAsync(int orderID, UpdateStatusDto updateStatus)
        {
            var updated = _unitOfWork.Order.GetAsync(c => c.OrderId == orderID);
            if (updated == null) return false;
            await _unitOfWork.Order.UpdateStatusAsync(orderID, updateStatus);
            return true;
        }
    }
}
