import React from 'react'
import { VariantGet } from '../../../Model/Variant'
import { BASE_URL } from '../../../Utils/constant'

export type Props = {
    VariantList: VariantGet[]
    variantSelected: VariantGet
    defaultImage: string
}

const VariantImagePreview = ({ VariantList, variantSelected, defaultImage }: Props) => {
    return (
        <div
            id="header-carousel"
            className="carousel slide carousel-fade mb-30 mb-lg-0"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner">
                {VariantList && VariantList.map(variant => (
                    <div className={`carousel-item position-relative ${variantSelected.variantId == variant.variantId ? 'active' : ''}
                     `} style={{ height: "430px" }}>
                        <img className="position-absolute w-100 h-100" src={`${BASE_URL}/${variant.images[0]?.imageUrl ?? defaultImage}`} style={{ objectFit: "cover" }} />
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center" style={{ background: "rgba(61, 70, 77, 0.0)" }} >
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VariantImagePreview
