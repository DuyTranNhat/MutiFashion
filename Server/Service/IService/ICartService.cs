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
        Task<QueryObject<CartDto>> getCartByUserAsync(int idUser, int page, int limit);
        Task<CartDto> AddItemAsync(CreateCartDto cartDto);
    }
}
