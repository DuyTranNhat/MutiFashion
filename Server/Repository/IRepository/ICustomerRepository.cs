using Server.Dtos.Cart;
using Server.Dtos.Category;
using Server.Dtos.Customer;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        Task<Customer> UpdateAsync(int id, UpdateCustomerDto customerDto, string urlImage);
    }
}
