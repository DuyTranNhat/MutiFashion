using Server.Models;

namespace Server.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<Product> UpdateImageAsync(int idProduct, string? imageUrl);
    }
}
