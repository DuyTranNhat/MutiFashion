using Server.Dtos.Auth;
using Server.Dtos.Cart;
using Server.Dtos.Customer;
using Server.Helper;
using Server.Models;

namespace Server.Service.IService
{
    public interface ICartService
    {
        Task<Cart> RemoveItemAsync(int id);
        Task IncreaseQuantityAsync(int cartId);
        Task DecreaseQuantityAsync(int cartId);
        Task<Cart> AddItemAsync(CreateCartDto cartDto);
        Task<QueryObject<CartDto>> GetCartByUserAsync(int idUser, int page, int limit);
    }
}
