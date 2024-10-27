using Server.Dtos.Customer;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Customer;
using Server.Models;

namespace Server.Service.IService
{
    public interface ICustomerService
    {
        public Task<CustomerDto> GetByIdAsync(int id);

        public Task<Customer> updateProfileAsync(int id, UpdateCustomerDto customerDto);
    }
}
