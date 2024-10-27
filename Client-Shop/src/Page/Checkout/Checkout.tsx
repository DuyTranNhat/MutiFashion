import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/UseAuth';
import { CartGet } from '../../Model/Cart';
import { CartGetAPI } from '../../Service/CartService';
import { COD, PAYMENT_METHODS, PAYPAL } from '../../Utils/constant';
import { customerGetAPI } from '../../Service/CustomerService';
import { checkoutAPI } from '../../Service/OrderService';
import PayPalButton from '../../Component/PaypayButton/PaypalButton';
import { CreateOrderRequest } from '../../Model/Order';

const Checkout = () => {
    const { user, isLoggedIn } = useAuth();
    const [cartList, setCartList] = useState<CartGet[]>([]);
    const [order, setOrder] = useState<CreateOrderRequest>({
        name: '',
        address: '',
        phone: '',
        paymentMethod: COD,
        notes: ''
    });
    const [paymentMethod, setPaymentMethod] = useState<string>(COD);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            customerGetAPI(user?.customerId!).then(res => {
                if (res?.data) {
                    setOrder({
                        ...order,
                        name: res.data.name,
                        address: res.data.address ?? '',
                        phone: res.data.phone ?? '',
                    });
                }
            }).catch(error => toast.error(error.message));
        }

        CartGetAPI(user?.customerId!, 1).then(res => {
            if (res?.data) {
                setCartList(res.data.items);
            }
        }).catch(error => toast.error(error.message));
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setOrder(prevOrder => ({ ...prevOrder, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn()) {
            toast.warning("Please Login");
            return;
        }

        try {
            const res = await checkoutAPI(user!.customerId, order);
            if (res?.status === 200) {
                toast.success('Order placed successfully!');
                navigate(`/completedCheckout/${res.data}`);
            }
        } catch (error) {
            toast.error('Failed to place order.');
        }
    };

    const totalAmount = cartList.reduce((total, item) => total + item.totalPrice, 0);

    const handlePayPalSuccess = (details: any, data: any) => {
        console.log("Transaction completed by " + details.payer.name.given_name);
        navigate(`/completedCheckout/${data.orderID}`);
    };

    const handleSelectMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrder(prev => ({...prev, paymentMethod: e.target.value}))
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-6">
                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pr-3">Billing Address</span>
                    </h5>
                    <div className="bg-light p-30 mb-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    name="name"
                                    value={order.name || ""}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    type="text"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    name="phone"
                                    value={order.phone || ""}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    type="text"
                                    placeholder="Your Phone Number"
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <textarea
                                    name="address"
                                    value={order.address || ""}
                                    onChange={handleInputChange}
                                    rows={8}
                                    className="form-control"
                                    placeholder="Your Address"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6">
                    <h5 className="section-title position-relative text-uppercase mb-3">
                        <span className="bg-secondary pr-3">Order Total</span>
                    </h5>
                    <div className="bg-light p-30 mb-5">
                        <div className="border-bottom">
                            <h6 className="mb-3">Products</h6>
                            {cartList.map(item => (
                                <div key={item.variant.variantId} className="d-flex justify-content-between">
                                    <p style={{ width: '70%' }}>
                                        {`${item.variant.productName} (${item.variant.variantValues
                                            .map(value => `${value.attributeName}: ${value.value}`)
                                            .join(', ')})`}
                                    </p>
                                    <p>
                                        {item.quantity} X{' '}
                                        {item.variant.salePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="border-bottom pt-3 pb-2">
                            <div className="d-flex justify-content-between mb-3">
                                <h6>Subtotal</h6>
                                <h6>
                                    {totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6 className="font-weight-medium">Shipping</h6>
                                <h6 className="font-weight-medium">0</h6>
                            </div>
                        </div>
                        <div className="pt-2">
                            <div className="d-flex justify-content-between mt-2">
                                <h5>Total</h5>
                                <h5>
                                    {totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Payment</span>
                        </h5>
                        <div className="bg-light p-30">
                            {PAYMENT_METHODS.map(method => (
                                <div key={method.name} className="form-group">
                                    <div className="custom-control custom-radio" style={{ cursor: "pointer" }}>
                                        <input
                                            type="radio"
                                            onChange={handleSelectMethod}
                                            value={method.name}
                                            id={method.name}
                                            className="custom-control-input"
                                            name="paymentMethod"
                                            checked={paymentMethod === method.name}
                                        />
                                        <label className="custom-control-label" htmlFor={method.name}>{method.name}</label>
                                    </div>
                                </div>
                            ))}
                            {
                                paymentMethod === PAYPAL &&
                                <PayPalButton
                                    idUser={user?.customerId!}
                                    orderPost={order}
                                />
                            }
                            {
                                paymentMethod === COD &&
                                <button
                                    className="btn btn-block btn-primary font-weight-bold py-3"
                                    onClick={handleSubmit}
                                >
                                    Place Order (COD)
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
