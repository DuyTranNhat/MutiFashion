import React, { useEffect, useState } from 'react'
import { ProductGetAPI } from '../../Services/ProductService'
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
            label: "Total variant",
            render: (productGet: ProductGet) => productGet.totalVariant,
        },
        {
            label: (<button
                className='btn btn-primary ms-auto'
                onClick={() => navigate("/product/create")}
            >
                New
            </button>),
            render: (product: ProductAttributePost) => (
                <div className='d-flex flex-start'>
                    <button
                        type="button"
                        className="btn btn-success d-flex align-items-center me-2"
                    // onClick={() => navigate(`/admin/banner/edit/${banner.slideId}`)}
                    >
                        <FaPen />
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger d-flex align-items-center me-2"
                    // onClick={() => handleDelete(banner.slideId)}
                    >
                        <FiTrash />
                    </button>
                </div>
            ),
        }
    ]

    return (
        <div className='container-fluid pt-4 px-4' >
            <h1>Product</h1>
            <div className="col-12">
                <div className="rounded-2 border shadow custom-container h-100 " style={{ padding: "18px 58px" }}>
                    <div style={{ height: "100px" }} className='d-flex align-items-center' >
                        <h6 className="mb-4">(Search/ Filter)</h6>

                    </div>
                    {products
                        ? <Table configs={configsTableProduct} data={products} />
                        : <h3>loading</h3>
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
    )
}

export default Product
