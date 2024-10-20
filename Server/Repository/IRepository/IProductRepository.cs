using Server.Models;

namespace Server.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<int> UpdateImageAsync(int idProduct, string? imageUrl);
    }
}
