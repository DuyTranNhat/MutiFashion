using Server.Dtos.Cart;
using Server.Dtos.Category;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface ICartRepository : IRepository<Cart>
    {
        Task<Cart> IncreaseQuantityAsync(int idCart);
        Task<Cart> DecreaseQuantityAsync(int cartId);
        Task<Cart> UpdateAsync(CreateCartDto cartDto);
    }
}
