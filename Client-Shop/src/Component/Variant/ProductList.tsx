import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { ProductGet } from '../../Model/Product';
import { ProductGetAPI } from '../../Service/ProductService';

export type Props = {
    col: number;
}

const ProductList = ({ col }: Props) => {
    const [productList, setProductList] = useState<ProductGet[]>()

    useEffect(() => {
        ProductGetAPI()
            .then(res => {
                if (res?.data) {
                    setProductList(res.data.items)
                }
            })
    }, [])

    

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
