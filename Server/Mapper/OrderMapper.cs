using ecommerce_backend.Dtos.Order;
using Server.Dtos.Order;
using Server.Models;

namespace Server.Mapper
{
    public static class OrderMapper
    {
        public static OrderDto ToOrderDto(this Order order, string customerName)
        {
            return new OrderDto
            {
                OrderId = order.OrderId,
                CustomerName = customerName,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                Status = order.Status,
                Address = order.Address,
                Phone = order.Phone,
                PaymentMethod = order.PaymentMethod,
                Notes = order.Notes
            };
        }

        public static Order ToOrderFromCreate(this CreateOrderDto orderDto, int customerID)
        {
            return new Order
            {
                CustomerId = customerID,
                OrderDate = DateTime.Now,
                Status = "pending",
                Address = orderDto.Address,
                Phone = orderDto.Phone,
                PaymentMethod = orderDto.PaymentMethod,
                Notes = orderDto.Notes
            };
        }
    }
}
