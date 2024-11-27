import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { ProductGet } from '../../Model/Product';
import { ProductGetAPI } from '../../Service/ProductService';
import { PAGE_LIMIT_PRODUCT, PAGE_LIMIT_PRODUCT_4 } from '../../Utils/constant';
import { PageObject } from '../../Model/Common';
import Pagination from '../Pagination/Pagination';
import { toast } from 'react-toastify';

export type Props = {
    col: number;
    existedProducts?: ProductGet[] | null
    activePage: boolean
}

const ProductList = ({ col, existedProducts, activePage }: Props) => {
    const [productList, setProductList] = useState<ProductGet[]>()
    const [page, setPage] = useState<PageObject>();

    const handlePageChange = (pageNumber: number) => {
        ProductGetAPI(pageNumber, PAGE_LIMIT_PRODUCT_4)
            .then(res => {
                if (res?.data) {
                    setPage(res?.data.page)
                    setProductList(res?.data.items)
                }
            }).catch(error => toast.error(error))
    }


    useEffect(() => {
        existedProducts
            ? setProductList(existedProducts)
            : (ProductGetAPI(1, PAGE_LIMIT_PRODUCT_4)
                .then(res => {
                    if (res?.data) {
                        setProductList(res.data.items)
                        setPage(res.data.page)
                    }
                }))
    }, [existedProducts])

    return <div className="row px-xl-5">
        {
            productList
                ?
                <>
                    {
                        productList.map(product =>
                            <ProductItem col={col} product={product} />
                        )
                    }
                    {
                        activePage && <Pagination
                            onPageChange={handlePageChange}
                            pageSize={page?.pageSize!}
                            currentPage={page?.currentPage!}
                            totalItems={page?.totalItems!}
                            totalPages={page?.totalPages!}
                        />
                    }
                </>

                : <h4>Loading</h4>
        }
    </div>
}

export default ProductList
