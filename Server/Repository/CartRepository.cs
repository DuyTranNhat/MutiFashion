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

        public async Task<Cart> UpdateAsync(CreateCartDto cartDto)
        {

            var existingCart = _db.Carts.FirstOrDefault(c => c.VariantId == cartDto.VariantId && c.CustomerId == cartDto.CustomerId);
            if (existingCart == null) return null;
            existingCart.Quantity += cartDto.Quantity;
            existingCart.DateAdded = cartDto.DateAdded;
            await _db.SaveChangesAsync();
            return existingCart;
        }


        public async Task<Cart?> increaseQuantity(int idCart)
        {
            var existingCart = _db.Carts.Where(c => c.CartId == idCart).
                    Include(c => c.Variant).ThenInclude(v => v.Images)
                    .Include(c => c.Variant).ThenInclude(v => v.VariantValues).
                    ThenInclude(v => v.Value).FirstOrDefault();
            if (existingCart == null) return null;

            if (existingCart.Quantity >= existingCart.Variant.Quantity)
            {
                throw new BadHttpRequestException("Quantity cannot be increased further as it is not enough.");
            }

            existingCart.Quantity += 1;
            await _db.SaveChangesAsync();
            return existingCart;
        }

        public async Task<Cart?> decreaseQuantity(int idCart)
        {
            var existingCart = _db.Carts.Where(c => c.CartId == idCart).
                    Include(c => c.Variant).ThenInclude(v => v.Images)
                    .Include(c => c.Variant).ThenInclude(v => v.VariantValues).
                    ThenInclude(v => v.Value).FirstOrDefault();
            if (existingCart == null) return null;

            if (existingCart.Quantity == 0)
            {
                throw new BadHttpRequestException("Quantity cannot be reduced further as it is already zero.");
            }

            existingCart.Quantity -= 1;
            await _db.SaveChangesAsync();
            return existingCart;
        }
    }
}