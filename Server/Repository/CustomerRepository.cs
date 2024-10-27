using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Customer;
using Server.Models;
using Server.Repository.IRepository;

namespace Server.Repository
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        private readonly MutiFashionContext _db;
        public CustomerRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Customer> UpdateAsync(int id, UpdateCustomerDto customerDto, string urlImage)
        {
            var existingCustomer = await _db.Customers.FirstOrDefaultAsync(x => x.CustomerId == id);

            if (existingCustomer == null)
                return null;

            existingCustomer.Name = customerDto.Name ?? existingCustomer.Name;  
            existingCustomer.Email = customerDto.Email ?? existingCustomer.Email;
            existingCustomer.Phone = customerDto.Phone ?? existingCustomer.Phone;
            existingCustomer.Address = customerDto.Address ?? existingCustomer.Address;

            if (!string.IsNullOrEmpty(urlImage))
            {
                existingCustomer.ImageUrl = urlImage;
            }

            await _db.SaveChangesAsync();
            return existingCustomer;
        }
    }
}
