import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderGet } from '~/Models/Order';
import { CheckoutCompletedGetAPI } from '~/Services/OrderService';

const CompletedCheckout = () => {
    const { idOrder } = useParams()
    const [oreder, setOrder] = useState<OrderGet>()



    useEffect(() => {
        if (idOrder) {
            CheckoutCompletedGetAPI(Number(idOrder))
                .then(res => {
                    if (res?.data) {
                        setOrder(res?.data)
                    }
                })
        }
    }, [idOrder])

    return (
        <div className="container-fluid">
            <div className="row px-xl-5 justify-content-center">
                <div className="col-lg-8">
                    <div className="bg-light p-30 mb-5">
                        <div className="row px-4">
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom pt-3 mb-3 pb-2 d-flex py-4">
                                    <div>
                                        <h6>Hóa đơn số {oreder?.orderId}</h6>
                                        <h6>{oreder?.orderDate}</h6>
                                    </div>
                                    <h2 className="ms-auto">Hóa đơn</h2>
                                </div>

                                <div className="border-bottom mb-3 pb-2 d-flex align-items-center">
                                    <div>
                                        <h6 className="me-2">Họ Tên Khách Hàng: {oreder?.customerName}</h6>
                                        <h6 className="me-2">Số điện thoại khách hàng: {oreder?.phone}</h6>
                                        <h6 className="me-2">Địa chỉ: {oreder?.address}</h6>
                                    </div>
                                </div>

                                <div className="border-bottom pb-4">
                                    <h6 className="mb-3">Products</h6>
                                    <div className="table-responsive">
                                        <table className="table table-bordered text-center">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>TÊN SẢN PHẨM</th>
                                                    <th>SỐ LƯỢNG</th>
                                                    <th>ĐƠN GIÁ</th>
                                                    <th>THÀNH TIỀN</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {oreder?.orderDetails.map(od =>
                                                (<tr>
                                                    <td className='text-start' style={{ maxWidth: "328px" }} >{od.variant.variantName}{od.variant.values.map(value => `, (${value.attributeName}:${value.value1})`)}</td>
                                                    <td>{od.quantity}</td>
                                                    <td>{od.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td>{(od.quantity * od.variant.salePrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                </tr>)
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Total</h5>
                                        <h5>{oreder?.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                    </div>
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
