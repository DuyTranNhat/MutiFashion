using Server.Data;
using Server.Repository.IRepository;
using Server.Dtos.Cart;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Repository;

namespace Server.DataAccess.Repository
{
    public class CartRepository : Repository<Cart>, ICartRepository
    {
        private readonly MutiFashionContext _db;

        public CartRepository(MutiFashionContext db) : base(db)
        {
            _db = db;
        }

        public async Task<Cart> IncreaseQuantityAsync(int idCart)
        {
            var existingCart = await _db.Carts.FirstOrDefaultAsync(c => c.CartId == idCart);
            existingCart.Quantity += 1;
            await _db.SaveChangesAsync();
            return existingCart;
        }

        public async Task<Cart> DecreaseQuantityAsync(int idCart)
        {
            var existingCart = await _db.Carts.FirstOrDefaultAsync(c => c.CartId == idCart);
            existingCart.Quantity -= 1;
            await _db.SaveChangesAsync();
            return existingCart;
        }

        public async Task<Cart> UpdateAsync(CreateCartDto cartDto)
        {

            var existingCart = _db.Carts.FirstOrDefault(c => c.VariantId == cartDto.VariantId && c.CustomerId == cartDto.CustomerId);
            if (existingCart == null) return null;
            existingCart.Quantity += cartDto.Quantity;
            existingCart.DateAdded = cartDto.DateAdded;
            await _db.SaveChangesAsync();
            return existingCart;
        }
    }
}