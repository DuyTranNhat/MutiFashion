import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Utils/constant';
import { ProductGet } from '../../Model/Product';

export type Props = {
    col: number;
    product: ProductGet
}

const ProductItem = ({ col, product }: Props) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/DetailsVariant/${product.productId}`)} className={`col-lg-${col} col-md-6 col-sm-6 pb-1`}>
            <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                    <img className="img-fluid w-100" src={`${BASE_URL}/${product.imageUrl}`} alt="" />
                    <div className="product-action">
                        <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a>
                        <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                        <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></a>
                        <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></a>
                    </div>
                </div>
                <div className="text-center p-4">
                    <a className="h6 text-decoration-none multi-line-truncate" style={{minHeight: "38px"}}> {product.name}</a>
                    <div className="d-flex align-items-center justify-content-center mt-2">
                        <h5 className='' >
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency'
                                , currency: 'USD'
                            }).format(product?.salePrice ?? 0)}</h5>
                        <h6 className="text-muted ml-2">
                            {/* <del>(bổ xung sau)</del> */}
                        </h6>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-1">
                        <small className='text-primary' >Total previews ({product.totalPreviews})</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
