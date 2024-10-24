import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { ProductGet } from '../../Model/Product';
import { ProductGetAPI } from '../../Service/ProductService';

export type Props = {
    col: number;
    existedProducts?: ProductGet[] | null
}

const ProductList = ({ col, existedProducts }: Props) => {
    const [productList, setProductList] = useState<ProductGet[]>()

    useEffect(() => {
        existedProducts 
        ? setProductList(existedProducts)
        : (ProductGetAPI()
            .then(res => {
                if (res?.data) {
                    setProductList(res.data.items)
                }
            }))
    }, [existedProducts])

    return <div className="row px-xl-5">
        {
            productList 
                ?
                (productList.map(product =>
                    <ProductItem col={col} product={product} />))
                : <h4>Loading</h4>
        }
    </div>
}

export default ProductList
