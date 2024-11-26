import React, { useEffect, useState } from 'react'
import Paging from '../../Components/Paging/Paging'
import Table from '../../Components/Table/Table'
import { APPROVE_ORDER, CANCEL_ORDER, PAGE_LIMIT_ORDERS, PENDING_ORDER } from '../../Utils/constant'
import { OrdersGetAPI, StatusOrderUpdateAPI } from '../../Services/OrderService'
import { OrderGet, OrderStatusPost } from '../../Models/Order'
import { PageObject } from '../../Models/Common'
import { FcApproval } from 'react-icons/fc'
import { FiTrash } from 'react-icons/fi'
import OrderDetails from './OrderDetails'
import { BiDetail } from 'react-icons/bi'
import { toast } from 'react-toastify'

const Order = () => {
    const [orders, setOrder] = useState<OrderGet[]>()
    const [pageObject, setPageObject] = useState<PageObject>()
    const [selectedOrder, setSelectedOrder] = useState<OrderGet | null>()

    useEffect(() => {
        OrdersGetAPI(1, PAGE_LIMIT_ORDERS)
            .then(res => {
                if (res?.data) {
                    setOrder(res.data.items)
                    setPageObject(res.data.page)
                    console.log(res.data.items);
                }
            })
    }, [])

    const handlePageChange = (pageNumber: number) => {
        OrdersGetAPI(pageNumber, PAGE_LIMIT_ORDERS)
            .then(res => {
                if (res?.data) {
                    console.log(res.data);
                }
            })
    }

    const handleBackHome = () => {
        setSelectedOrder(null)
    }

    const handleUpdateStatusOD = (idOrder: number, updateStatus: string) => {
        if (!idOrder) return;
        const updateOrder: OrderStatusPost = {
            statusOrder: updateStatus
        }
        StatusOrderUpdateAPI(idOrder, updateOrder)
            .then(res => {
                if (res?.status === 204) {
                    toast.success("Updated successfully!")
                    setOrder(prev => {
                        return prev?.map(item =>
                            (item.orderId === idOrder)
                                ? { ...item, status: updateStatus }
                                : item
                        )
                    })
                }
            }).catch(err => toast.error(err))
    }

    const handleOpenOrderDetail = (id: number) => {
        let order = orders?.find(od => od.orderId === id)
        setSelectedOrder(order)
    }

    const configs = [
        {
            label: "#",
            render: (order: OrderGet, index: number) => index + 1,
        },
        {
            label: "Name Customer",
            render: (order: OrderGet) => order.customerName
        },
        {
            label: "ID's Order",
            render: (order: OrderGet) => order.orderId,
        },
        {
            label: "Total variant",
            render: (order: OrderGet) => order.totalAmount.
                toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        },
        {
            label: "Time's Order",
            render: (order: OrderGet) => order.orderDate,
        },
        {
            label: "Status's Order",
            render: (order: OrderGet) => {
                return <button
                    type="button"
                    className={`btn btn-sm d-flex text-white align-items-center me-2
                            ${getColorClassSatusOrder(order.status!)}
                        `}
                // onClick={() => handleDelete(banner.slideId)}
                >
                    {order.status}
                </button>
            }
        },
        {
            label: "Status's Order",
            render: (order: OrderGet) => {
                return (
                    <div className='d-flex'  >
                        <button
                            type="button"
                            className="btn btn-sm btn-primary d-flex align-items-center me-2"
                            onClick={() => handleOpenOrderDetail(order.orderId)}
                        >
                            <BiDetail className='me-2' />Details
                        </button>
                        {
                            order.status === PENDING_ORDER
                            && (<>
                                <button
                                    type="button"
                                    className="me-2 btn btn-sm btn-success d-flex text-white align-items-center me-2"
                                    onClick={() => handleUpdateStatusOD(order.orderId, APPROVE_ORDER)}
                                >
                                    <FcApproval className='me-2' />
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    className="me-2 btn btn-sm btn-danger d-flex text-white align-items-center me-2"
                                    onClick={() => handleUpdateStatusOD(order.orderId, CANCEL_ORDER)}
                                >
                                    <FiTrash className='me-2' />
                                    Cancel
                                </button>
                            </>)
                        }
                    </div>
                )
            }
        }
    ]

    const getColorClassSatusOrder = (status: string) => {
        if (status === PENDING_ORDER) return "btn-info"
        if (status === CANCEL_ORDER) return "btn-danger"
        if (status === APPROVE_ORDER) return "btn-success"
    }


    return (
        !selectedOrder ?
            (<div className='container-fluid pt-4 px-4' >
                <div className="col-12">
                    <div className="rounded-2 border shadow custom-container h-100" style={{ padding: "18px 58px" }}>
                        <h3 className='py-3 text-center' >Order Management</h3>
                        <div className="table-responsive"></div>
                        <div>
                            {orders
                                ? (<Table data={orders} configs={configs} />)
                                : <h1>Loading</h1>

                            }
                            <Paging
                                currentPage={pageObject?.currentPage!}
                                onPageChange={handlePageChange}
                                pageSize={pageObject?.pageSize!}
                                totalItems={pageObject?.totalItems!}
                                totalPages={pageObject?.totalPages!}
                            />
                        </div>
                    </div>
                </div>
            </div>)
            : (
                <OrderDetails handleBackHome={handleBackHome} order={selectedOrder} />
            )
    )
}

export default Order
