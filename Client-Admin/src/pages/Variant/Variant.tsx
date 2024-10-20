import React, { useEffect, useState } from 'react'
import { VariantGetAPI } from '../../Services/VariantService';
import { VariantGet } from '../../Models/Variant';
import { API_URL, getRandomColorClass, getRandomColorClassOL } from '../../Utils/constant';
import Table from '../../Components/Table/Table';
import { useNavigate } from 'react-router-dom';

const Variant = () => {
    const [variants, setVariants] = useState<VariantGet[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        VariantGetAPI()
            .then(res => {
                if (res?.data) {
                    setVariants(res?.data.items);
                }
            })
    }, [])

    const handleClickRecordTB = (idVariant: number) =>
        navigate(`/variants/details/${idVariant}`)



    const configs = [
        {
            label: "Sku ID",
            render: (variant: VariantGet, index: number) => variant.skuId,
        },
        {
            label: <p style={{ minWidth: "200px" }} >Variant's Name</p>,
            render: (variant: VariantGet) => variant.productName,
        },
        {
            label: "Variant's Values",
            render: (variant: VariantGet) =>
            (
                <ul className="list-group list-group-flush">
                    <div >
                        {
                            variant.images.length > 0
                                ? (variant.images.slice(0, 3).map(img => (
                                    <img
                                        className="rounded-circle img-fluid me-2"
                                        src={`${API_URL}/${img.imageUrl}`}
                                        alt=""
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                )))
                                : (
                                    <div className='d-flex align-items-center' >
                                        <img
                                            className="rounded-circle img-fluid me-2"
                                            src={`${API_URL}/${variant.baseImage}`}
                                            alt=""
                                            style={{ width: '40px', height: '40px' }}
                                        />
                                    </div>
                                )
                        }
                    </div>
                    {
                        variant.variantValues.map(variantValue =>
                        (
                            <>
                                <button
                                    className={`btn btn-sm mt-2 ${getRandomColorClassOL()}`}
                                >
                                    {`${variantValue.attributeName}: ${variantValue.value}`}
                                </button>
                            </>
                        )
                        )
                    }

                </ul>
            ),
        },
        {
            label: "Variant's Price",
            render: (variant: VariantGet) =>
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(variant.salePrice),
        },
        {
            label: "Variant's Quantity",
            render: (variant: VariantGet) => variant.quantity
        },
    ]


    return (
        <div className='container-fluid pt-4 px-4' >
            <h1>Product</h1>
            <div className="col-12">
                <div className="rounded-2 border shadow custom-container h-100 " style={{ padding: "18px 58px" }}>
                    <div style={{ height: "100px" }} className='d-flex align-items-center' >
                        <h6 className="mb-4">(Search/ Filter)</h6>

                    </div>
                    {variants
                        ? <Table
                            configs={configs}
                            data={variants}
                            onClickRecord={handleClickRecordTB}
                        />
                        : <h3>loading</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default Variant
