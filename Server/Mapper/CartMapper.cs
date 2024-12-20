using Server.Dtos.Cart;
using Server.Mapper;
using Server.Models;

namespace Server.Mappers
{
    public static class CartMapper
    {
        public static CartDto ToCartDto(this Cart cartModel)
        {
            return new CartDto
            {
                CartId = cartModel.CartId,
                CustomerId = cartModel.CustomerId,
                Variant = cartModel.Variant.ToVariantDto(),
                Quantity = cartModel.Quantity,
                DateAdded = cartModel.DateAdded
            };
        }

        public static Cart ToCartFromCreate(this CreateCartDto cartDto)
        {
            return new Cart
            {
                CustomerId = cartDto.CustomerId,
                VariantId = cartDto.VariantId,
                Quantity = cartDto.Quantity,
                DateAdded = cartDto.DateAdded
            };
        }
    }
}