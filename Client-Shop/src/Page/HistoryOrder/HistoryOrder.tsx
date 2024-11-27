import React, { useEffect, useState } from 'react'
import './HistoryOrder.scss'
import { HistoryOrderByCusAPI } from '../../Service/OrderService'
import Table from '../../Component/Table/Table'
import { OrderGet } from '../../Model/Order'
import { PageObject } from '../../Model/Common'
import Pagination from '../../Component/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'

const HistoryOrder = () => {
    const [historyOrders, setHistoryOrders] = useState<OrderGet[]>([])
    const [page, setPage] = useState<PageObject>()
    const navigate = useNavigate()

    useEffect(() => {
        HistoryOrderByCusAPI(1, 4)
            .then(res => {
                if (res?.data) {
                    setHistoryOrders(res?.data.items)
                    setPage(res?.data.page)
                }
            })
    }, [])

    const handlePageChange = (pageNumber: number) => {
        HistoryOrderByCusAPI(pageNumber, 4)
            .then(res => {
                if (res?.data) {
                    setHistoryOrders(res?.data.items)
                    setPage(res?.data.page)
                }
            })
    }

    const configs = [
        {
            label: "ID",
            render: (HistoryOrder: OrderGet) => HistoryOrder.orderId,
        },
        {
            label: "HistoryOrder's Status",
            render: (HistoryOrder: OrderGet) =>
            (
                HistoryOrder.status
            )
        },
        {
            label: "Order Date",
            render: (HistoryOrder: OrderGet) => {
                return HistoryOrder.orderDate
            }
        },
        {
            label: "Total",
            render: (HistoryOrder: OrderGet) => {
                return HistoryOrder.totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            }
        },
        {
            label: "Details",
            render: (historyOrder: OrderGet) => {
                return <button className='btn btn-primary'
                    onClick={() => navigate(`/checkoutSuccess/${historyOrder.orderId}`)}
                >View Invoice</button>
            }
        }
    ]

    return (
        <div className='my-table' >
            <div className="container">
                <h2 className='text-uppercase'>Your history orders</h2>
                <Table data={historyOrders} configs={configs} />
                <Pagination
                    onPageChange={handlePageChange}
                    pageSize={page?.pageSize!}
                    currentPage={page?.currentPage!}
                    totalItems={page?.totalItems!}
                    totalPages={page?.totalPages!}
                />
            </div>
        </div>
    )
}

export default HistoryOrder
