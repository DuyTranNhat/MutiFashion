using Server.Dtos.Customer;
using Server.Models;

namespace Server.Mapper
{
    public static class CustomerMapper
    {
        public static CustomerDto ToCustomerDto(this Customer customer)
        {
            return new CustomerDto
            {
                Role = customer.Role,
                Name = customer.Name,
                Email = customer.Email,
                Phone = customer.Phone,
                Address = customer.Address,
                ImageUrl = customer.ImageUrl,
                CustomerId = customer.CustomerId,
            };
        }
    }
}
