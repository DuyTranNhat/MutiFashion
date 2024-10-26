import React from 'react'
import { CartGet } from '../../Model/Cart'
import CartItem from './CartItem'

type Props = {
    carts: CartGet[],
    handleIncrease: (idCart : number) => void,
    handleDecrease: (idCart : number) => void,
    handleRemoveCart: (idCart: number) => void,
}

const CartList = ({ carts, handleDecrease, handleIncrease, handleRemoveCart } : Props) => {
  return (
    carts ? (
        carts.map(cart => <CartItem handleRemoveCart={handleRemoveCart} handleDecrease={handleDecrease} handleIncrease={handleIncrease}  cart={cart} />)
    ) : <>Loading</>
  )
}

export default CartList
