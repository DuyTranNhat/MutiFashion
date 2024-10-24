using Server.Dtos.Cart;
using Server.Dtos.Category;
using Server.Models;

namespace Server.Repository.IRepository
{
    public interface ICartRepository : IRepository<Cart>
    {
        public Task<Cart> increaseQuantity(int idCart);
        public Task<Cart?> decreaseQuantity(int idCart);
        public Task<Cart> UpdateAsync(CreateCartDto cartDto);
    }
}
