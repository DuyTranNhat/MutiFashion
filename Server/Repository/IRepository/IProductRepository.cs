using Server.Models;

namespace Server.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        Task ToggleStatusyAsync(int idPro);
        Task<int> UpdateImageAsync(int idProduct, string? imageUrl);
    }
}
