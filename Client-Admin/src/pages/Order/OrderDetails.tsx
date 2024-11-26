import React from 'react'
import { OrderDetailGet, OrderGet } from '../../Models/Order';
import Table from '../../Components/Table/Table';
import { BASE_URL, getRandomColorClassOL } from '../../Utils/constant';
import { set } from 'react-hook-form';

export type Props = {
    order: OrderGet;
    handleBackHome: () => void
}

const OrderDetails = ({ order, handleBackHome }: Props) => {
    const configs = [
        {
            label: "#",
            render: (orderDetailGet: OrderDetailGet, index: number) => index + 1,
        },
        {
            label: "Product's Name",
            render: (od: OrderDetailGet) => `${od.variant.productName} 
            (${od.variant.variantValues.map(vl => `${vl.attributeName}: ${vl.value}`)})`,
        },
        {
            label: "Price",
            render: (orderDetailGet: OrderDetailGet) => orderDetailGet.variant.salePrice.
                toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        },
        {
            label: "Quantity",
            render: (orderDetailGet: OrderDetailGet) => orderDetailGet.quantity
        },
        {
            label: "Total",
            render: (orderDetailGet: OrderDetailGet) => (orderDetailGet.quantity * orderDetailGet.price)
                .toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        },
    ]

    return (
        <div className='container-fluid pt-4 px-4' >
            <div className="col-12">
                <div className="rounded-2 border shadow custom-container h-100 " style={{ padding: "58px" }}>
                    <div className='d-flex' >
                        <h4>Order Details</h4>
                        <button className='ms-auto btn btn-dark'
                            onClick={handleBackHome}
                        >Back</button>
                    </div>
                    <div
                        className='border-1 border rounded-3 mt-4 mb-4 p-4' >
                        <form>
                            <div className='row' >
                                <div className='col-6' >
                                    <div className="mb-3 form-floating">
                                        <div className="form-text">
                                            <label className="fw-bold form-label">ID Order</label>
                                            <input
                                                className="form-control"
                                                disabled
                                                value={order.orderId}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 form-floating">
                                        <div id="emailHelp" className="form-text">
                                            <label className="fw-bold form-label">Total</label>
                                            <input
                                                className="form-control"
                                                disabled
                                                value={order.totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 form-floating">
                                        <div id="emailHelp" className="form-text">
                                            <label className="fw-bold form-label">Status Order</label>
                                            <input
                                                className="form-control"
                                                disabled
                                                value={order.status!}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='col-6' >

                                    <div className="mb-3 form-floating">
                                        <div id="emailHelp" className="form-text">
                                            <label className="fw-bold form-label">Customer's Name</label>
                                            <input
                                                className="form-control"
                                                disabled
                                                value={order.customerName}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 form-floating">
                                        <div id="emailHelp" className="form-text">
                                            <label className="fw-bold form-label">Time</label>
                                            <input
                                                className="form-control"
                                                disabled
                                                value={order.orderDate}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 form-floating">
                                        <div id="emailHelp" className="form-text">
                                            <label className="fw-bold form-label">Address</label>
                                            <input
                                                className="form-control"
                                                disabled
                                                value={order.address}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form >
                    </div >
                    {order.orderDetails
                        ? <Table
                            configs={configs}
                            data={order.orderDetails}
                        // onClickRecord={handleClickRecordTB}
                        />
                        : <h3>loading</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
