import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartGetAPI, decreaseQuantityAPI, increaseQuantityAPI, removeCartAPI } from '../../Service/CartService';
import { CartGet } from '../../Model/Cart';
import CartList from '../../Component/Cart/CartList';
import { useAuth } from '../../Context/UseAuth';
import { PAGE_LIMIT_CART } from '../../Utils/constant';
import { PageObject } from '../../Model/Common';
import Pagination from '../../Component/Pagination/Pagination';

const Cart = () => {
    const [cartList, setCartList] = useState<CartGet[]>([]);
    const [page, setPage] = useState<PageObject>();
    const [total, setTotal] = useState<number>(0);
    const navigate = useNavigate();

    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn()) {
            CartGetAPI(user?.customerId!, 1, PAGE_LIMIT_CART)
                .then(res => {
                    if (res?.data) {
                        setCartList(res.data.items);
                        setPage(res.data.page);
                    }
                })
                .catch(error => toast.error(error));
        }
    }, []);

    useEffect(() => {
        const newTotal = cartList.reduce((total, item) => total + item.totalPrice, 0);
        setTotal(newTotal);
    }, [cartList]);

    const handleDecrease = (idCart: number) => {
        decreaseQuantityAPI(idCart)
            .then(res => {
                if (res?.status === 200) {
                    setCartList(prev =>
                        prev.map(item =>
                            item.cartId === idCart
                                ? {
                                    ...item, quantity: item.quantity - 1,
                                    totalPrice: item.variant.salePrice * (item.quantity - 1)
                                }
                                : item
                        )
                    );
                }
            })
            .catch(error => toast.error(error));
    };

    const handleIncrease = (idCart: number) => {
        increaseQuantityAPI(idCart)
            .then(res => {
                if (res?.status === 200) {
                    setCartList(prev =>
                        prev.map(item =>
                            item.cartId === idCart
                                ? {
                                    ...item, quantity: item.quantity + 1,
                                    totalPrice: item.variant.salePrice * (item.quantity + 1)
                                }
                                : item
                        )
                    );
                }
            })
            .catch(error => toast.error(error));
    };

    const handleRemoveCart = (idCart: number) => {
        removeCartAPI(idCart)
            .then(res => {
                if (res?.status === 200) {
                    toast.success(res.data.message);
                    setCartList(prev => prev.filter(item => item.cartId !== idCart));
                }
            })
            .catch(error => toast.error(error));
    };

    const handlePageChange = (pageNumber: number) => {
        CartGetAPI(user?.customerId!, pageNumber, PAGE_LIMIT_CART)
            .then(res => {
                if (res?.data) {
                    setCartList(res.data.items);
                    setPage(res.data.page);
                }
            })
            .catch(error => toast.error(error));
    };


    return (
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-9 table-responsive mb-5">
                    <table className="table table-light table-borderless table-hover text-center mb-0">
                        <thead className="thead-dark">
                            <tr>
                                <th></th>
                                <th>Products</th>
                                <th>Attributes</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {cartList.length > 0 ? (
                                <>
                                    <CartList
                                        handleRemoveCart={handleRemoveCart}
                                        handleDecrease={handleDecrease}
                                        handleIncrease={handleIncrease}
                                        carts={cartList}
                                    />
                                    <Pagination
                                        onPageChange={handlePageChange}
                                        pageSize={page?.pageSize!}
                                        currentPage={page?.currentPage!}
                                        totalItems={page?.totalItems!}
                                        totalPages={page?.totalPages!}
                                    />
                                </>
                            ) : (
                                <tr><td colSpan={7}>Empty Cart</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-3">
                    <form className="mb-30" action="">
                        <div className="input-group">
                            <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                            <div className="input-group-append">
                                <button className="btn btn-primary">Apply Coupon</button>
                            </div>
                        </div>
                    </form>
                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pr-3">Cart Summary</span>
                    </h5>
                    <div className="bg-light p-30 mb-5">
                        <div className="border-bottom pb-2">
                            <div className="d-flex justify-content-between mb-3">
                                <h6>Subtotal</h6>
                                <h6>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6 className="font-weight-medium">Shipping</h6>
                                <h6 className="font-weight-medium">0</h6>
                            </div>
                        </div>
                        <div className="pt-2">
                            <div className="d-flex justify-content-between mt-2">
                                <h5>Total</h5>
                                <h5>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h5>
                            </div>
                            <button
                                onClick={() => navigate("/checkout")}
                                className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                            >
                                Checkout (COD)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
