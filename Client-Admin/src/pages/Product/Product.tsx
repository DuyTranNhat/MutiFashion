import React, { useEffect, useState } from 'react'
import { ProductGetAPI, ProductStatusToggleAPI } from '../../Services/ProductService'
import Table from '../../Components/Table/Table'
import { ProductGet } from '../../Models/Product'
import { FaPen } from "react-icons/fa";
import { BASE_URL, PAGE_LIMIT_PRODUCT } from '../../Utils/constant';
import { FiTrash } from "react-icons/fi";
import { ProductAttributePost } from './ProductForm/AttributeForm';
import { useNavigate } from 'react-router-dom';
import { PageObject } from '../../Models/Common';
import Paging from '../../Components/Paging/Paging';
import { toast } from 'react-toastify';

const Product = () => {
    const [products, setProducts] = useState<ProductGet[]>()
    const [pageObject, setPageObject] = useState<PageObject>()

    const navigate = useNavigate()

    const handlePageChange = (pageNumber: number) => {
        ProductGetAPI(pageNumber, PAGE_LIMIT_PRODUCT)
            .then(res => {
                if (res?.data) {
                    setProducts(res?.data.items)
                    setPageObject(res?.data.page)
                }
            }).catch(error => toast.error(error))
    }

    useEffect(() => {
        ProductGetAPI()
            .then(res => {
                if (res?.data) {
                    setProducts(res?.data.items)
                    setPageObject(res?.data.page)
                }
            })
    }, [])

    const handleActiveStatus = (id: number) => {
        ProductStatusToggleAPI(id)
            .then(res => {
                if (res?.status === 204) {
                    setProducts(prev => prev?.map(pro =>
                        (pro.productId == id)
                            ? { ...pro, status: !pro.status }
                            : pro
                    ))
                }
            })
    }

    const configsTableProduct = [
        {
            label: "#",
            render: (productGet: ProductGet, index: number) => index + 1,
        },
        {
            label: "ProductGet's Image",
            render: (productGet: ProductGet) =>
            (
                <img
                    className="rounded-circle img-fluid"
                    src={`${BASE_URL}/${productGet.imageUrl}`}
                    alt=""
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
            )
        },
        {
            label: "ProductGet's Name",
            render: (productGet: ProductGet) => productGet.name,
        },
        {
            label: "Action",
            render: (productGet: ProductGet) =>
            (
                <td>
                    <div className="form-check form-switch">
                        <input className="form-check-input " type="checkbox" id="flexSwitchCheckDefault"
                            onChange={() => handleActiveStatus(productGet.productId)}
                            checked={productGet.status} />
                    </div>
                </td>
            )
            ,
        },
    ]

    return (
        <div className='container-fluid pt-4 px-4' >
            <h1>Product</h1>
            <div className="col-12">
                <div className="rounded-2 border shadow custom-container h-100 " style={{ padding: "18px 58px" }}>
                    <div style={{ height: "100px" }} className='d-flex align-items-center' >

                    </div>
                    {products
                        ? <Table configs={configsTableProduct} data={products} />
                        : <h3>loading</h3>
                    }
                    <Paging
                        onPageChange={handlePageChange}
                        pageSize={pageObject?.pageSize!}
                        currentPage={pageObject?.currentPage!}
                        totalItems={pageObject?.totalItems!}
                        totalPages={pageObject?.totalPages!}
                    />
                </div>
            </div>
        </div>
    )
}

export default Product
