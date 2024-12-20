﻿using Server.Dtos.Cart;
using Server.Exceptions;
using Server.Helper;
using Server.Mapper;
using Server.Mappers;
using Server.Models;
using Server.Repository.IRepository;
using Server.Service.IService;

namespace Server.Service
{
    public class CartService : ICartService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CartService(IUnitOfWork unitOfWork) { 
            _unitOfWork = unitOfWork;
        }
        public async Task IncreaseQuantityAsync(int cartId)
        {
            Cart? existingCart = await _unitOfWork.Cart.GetAsync(c => c.CartId == cartId, includeProperties: "Variant")
                ?? throw new NotFoundException("Cart is not existed!");

            if (existingCart.Quantity >= existingCart.Variant.Quantity)
                throw new BadHttpRequestException("Quantity cannot be increased further as it is not enough.");

            await _unitOfWork.Cart.IncreaseQuantityAsync(cartId);
        }

        public async Task DecreaseQuantityAsync(int cartId)
        {
            Cart? existingCart = await _unitOfWork.Cart.GetAsync(c => c.CartId == cartId, includeProperties: "Variant")
                ?? throw new NotFoundException("Cart is not existed!");

            if (existingCart.Quantity == 1)
                throw new BadHttpRequestException("Quantity cannot be reduced further as it is already zero.");

            await _unitOfWork.Cart.DecreaseQuantityAsync(cartId);
        }

        public async Task<Cart> AddItemAsync(CreateCartDto cartDto)
        {
            if (await _unitOfWork.Customer.GetAsync(c => c.CustomerId == cartDto.CustomerId) == null) 
                throw new NotFoundException ("User is not existed");
            if (await _unitOfWork.Variant.GetAsync(v => v.VariantId == cartDto.VariantId) == null)
                throw new NotFoundException("Variant is not existed");

            var existingCart = await _unitOfWork.Cart.GetAsync(c => c.Variant.VariantId == cartDto
                .VariantId && c.CustomerId == cartDto.CustomerId, includeProperties: "Variant");

            if (existingCart != null)
            {
                if (existingCart.Quantity >= existingCart.Variant.Quantity)
                throw new BadHttpRequestException("Quantity in stock is not enough.");
                var updatedCart = await _unitOfWork.Cart.UpdateAsync(cartDto);
                return updatedCart;
            }

            else
            {
                var newCart = cartDto.ToCartFromCreate();
                await _unitOfWork.Cart.AddAsync(newCart);
                await _unitOfWork.SaveAsync();
                return newCart;
            }
        }

        public async Task<QueryObject<CartDto>> GetCartByUserAsync(int idUser, int page, int limit)
        {
            var carts = await _unitOfWork.Cart.GetAllAsync(c => c.Customer.
            CustomerId == idUser , includeProperties: "Variant.Images," +
            "Variant.VariantValues.Value,Variant.VariantValues.ProductOption." +
            "Option,Variant.Product");

            var cartListDTO = carts.Select(c => c.ToCartDto()).FilterPage(page, limit);
            return cartListDTO;
        }

        public async Task<Cart?> RemoveItemAsync(int id)
        {
            var cartModel = await _unitOfWork.Cart.GetAsync(c => c.CartId == id);
            if (cartModel == null) return null;
            await _unitOfWork.Cart.RemoveAsync(cartModel);
            await _unitOfWork.SaveAsync();
            return cartModel;
        }
    }
}
