import React from 'react'
import { ImageGet } from '../../Models/Variant'
import { BASE_URL } from '../../Utils/constant'

type Props = {
    image: ImageGet
    index: number
    handleDelete: (idImgae: number) => void
}

const VariantImage = ({ image, index, handleDelete }: Props) => {
    return (
        <div style={{cursor: 'pointer'}} className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
            <div className="service-item rounded">
                <div className="service-img rounded-top">
                    <img src={`${BASE_URL}/${image.imageUrl}`} className="img-fluid rounded-top w-100" alt="" />
                </div>
                <div className="service-content rounded-bottom p-4">
                    <div className="service-content-inner">
                        <h5 className="mb-4">Module {index}</h5>
                        <button
                            id={image.imageId.toString()}
                            onClick={() => handleDelete(image.imageId)}
                            className="btn btn-danger rounded-pill text-white py-2 px-4 mb-2">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VariantImage
