import React from 'react'
import { CartGet } from '../../Model/Cart'
import { BASE_URL } from '../../Utils/constant'

type Props = {
    cart: CartGet,
    handleIncrease: (idCart: number) => void,
    handleDecrease: (idCart: number) => void,
    handleRemoveCart: (idCart: number) => void,
}


const CartItem = ({ cart, handleIncrease, handleDecrease, handleRemoveCart }: Props) => {
    return (
        <tr>
            <td className="align-middle">
                <img src={`${BASE_URL}/${cart.variant?.images[0]?.imageUrl || cart.variant.baseImage}`}
                    alt="" style={{ width: "50px" }} />
            </td>
            <td className="align-middle"> {cart.variant.productName}</td>
            <td className="align-middle">
                <ul>
                    {cart.variant.variantValues.map(value => <li>{`${value.attributeName}:${value.value}`}</li>)}
                </ul>
            </td>
            <td className="align-middle">
                {cart.variant.salePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </td>
            <td className="align-middle">
                <div className='d-flex align-items-center flex-column justify-content-center' >
                    <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
                        <div className="input-group-btn">
                            <button onClick={() => handleDecrease(cart.cartId)} className="btn btn-sm btn-primary btn-minus" >
                                <i className="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" value={cart.quantity} />
                        <div className="input-group-btn">
                            <button onClick={() => handleIncrease(cart.cartId)} className="btn btn-sm btn-primary btn-plus">
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <p className='mt-3 fw-bold'>(available: {cart.variant.quantity})</p>
                </div>
            </td>
            <td className="align-middle">
                {cart?.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </td>
            <td className="align-middle">
                <button className="btn btn-sm btn-danger"
                    onClick={() => handleRemoveCart(cart.cartId)}
                >
                    <i className="fa fa-times"></i>
                </button>
            </td>
        </tr>
    )
}

export default CartItem
