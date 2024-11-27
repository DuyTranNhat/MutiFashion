import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderGet } from '../../Model/Order';
import { CompletedOrderGetAPI } from '../../Service/OrderService';

const CompletedCheckout = () => {
    const { idOrder } = useParams();
    const [order, setOrder] = useState<OrderGet>();

    useEffect(() => {
        if (idOrder) {
            CompletedOrderGetAPI(Number(idOrder))
                .then(res => {
                    if (res?.data) {
                        setOrder(res?.data);
                    }
                });
        }
    }, [idOrder]);

    const navigate = useNavigate()

    return (
        <div className="container-fluid">
            <div className="row px-xl-5 justify-content-center">
                <div className="col-lg-8">
                    <div className="bg-light p-30 mb-5">
                        <div className="px-4">
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom pt-3 mb-3 pb-2 d-flex py-4">
                                    <div>
                                        <h6>Invoice No: {order?.orderId}</h6>
                                        <h6>{order?.orderDate}</h6>
                                    </div>
                                    <h2 className="ml-auto">Invoice</h2>
                                </div>

                                <div className="border-bottom mb-3 pb-2 d-flex align-items-center">
                                    <div>
                                        <h6 className="me-2">Customer Name: {order?.customerName}</h6>
                                        <h6 className="me-2">Customer Phone: {order?.phone}</h6>
                                        <h6 className="me-2">Address: {order?.address}</h6>
                                        <h6 className="me-2">Payment Method: ({order?.paymentMethod})</h6>
                                    </div>
                                </div>

                                <div className="border-bottom pb-4">
                                    <h6 className="mb-3">Products</h6>
                                    <div className="table-responsive">
                                        <table className="table table-bordered text-center">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>PRODUCT NAME</th>
                                                    <th>QUANTITY</th>
                                                    <th>UNIT PRICE</th>
                                                    <th>SUBTOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order?.orderDetails.map(od => (
                                                    <tr key={od.variant.skuId}>
                                                        <td className="text-start" style={{ maxWidth: "328px" }}>
                                                            {od.variant.productName}
                                                            {od.variant.variantValues.map(value => (
                                                                `, (${value.attributeName}: ${value.value})`
                                                            ))}
                                                        </td>
                                                        <td>{od.quantity}</td>
                                                        <td>{od.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                                        <td>{(od.quantity * od.variant.salePrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Total</h5>
                                        <h5>{order?.totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h5>
                                    </div>
                                </div>

                                <div className='mt-4 d-flex justify-content-center' > 
                                    <button
                                        onClick={() => navigate("/history")}
                                    className='w-100 btn btn-primary'>
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedCheckout;
