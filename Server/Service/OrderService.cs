using ecommerce_backend.Dtos.Order;
using Server.Dtos.Order;
using Server.Exceptions;
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


        //public async Task<OrderDto> GetCompletedOrderByIDAsync(int orderId)
        //{
        //    var order = await _unitOfWork.Order.GetAsync(o => o.OrderId == orderId,
        //        includeProperties: "OrderDetails.Variant.VariantValues.Value,Customer")
        //        ?? throw new BadHttpRequestException("Not found an order id");

        //    var orderDTO = order.ToOrderDetailsWithoutImagesDto(order.OrderDetails, attributes);
        //    return orderDTO;
        //}
    }
}
