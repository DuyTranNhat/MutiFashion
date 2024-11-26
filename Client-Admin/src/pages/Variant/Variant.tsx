import React, { useEffect, useState } from 'react'
import { VariantFilterAPI, VariantGetAPI } from '../../Services/VariantService';
import { FilterVariantPost, VariantGet } from '../../Models/Variant';
import { BASE_URL, getRandomColorClassOL, PAGE_LIMIT_VARIANT } from '../../Utils/constant';
import Table from '../../Components/Table/Table';
import { useNavigate } from 'react-router-dom';
import { PageObject } from '../../Models/Common';
import { toast } from 'react-toastify';
import Paging from '../../Components/Paging/Paging';
import Filter, { FilterForm } from './Filter/Filter';

const Variant = () => {
    const [variants, setVariants] = useState<VariantGet[]>([])
    const [pageObject, setPageObject] = useState<PageObject>()
    const [filterPost, setFilterPost] = useState<FilterVariantPost>(
        () => ({
            categoryID: null, fromPrice: null, keyWord: null,
            skuId: null, supplierID: null, toPrice: null
        } as FilterVariantPost)
    )
    const navigate = useNavigate()

    useEffect(() => {
        VariantGetAPI(1, PAGE_LIMIT_VARIANT)
            .then(res => {
                if (res?.data) {
                    setVariants(res?.data.items);
                    setPageObject(res?.data.page)
                }
            })
    }, [])

    const handlePageChange = (pageNumber: number) => {
        onSubmitFilter(filterPost, pageNumber)
    }

    const handleClickRecordTB = (idVariant: number) =>
        navigate(`/variants/details/${idVariant}`)

    const handleOnchangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterPost(prev => ({ ...prev, keyWord: e.target.value }))
    }

    const handleSelectedSupplier = (supplierID: number) => {
        setFilterPost(prev => ({ ...prev, supplierID }))
    }

    const handleSelectedCategory = (categoryID: number) => {
        setFilterPost(prev => ({ ...prev, categoryID }))
    }

    const handleOnchangeSku = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterPost(prev => ({ ...prev, skuId: e.target.value }))
    }

    const handleClearForm = () => {
        setFilterPost({
            categoryID: null, fromPrice: null, keyWord: null,
            skuId: null, supplierID: null, toPrice: null
        } as FilterVariantPost)

        handlePageChange(1)
    }

    const onSubmitFilter = (filterForm: FilterForm, page: number = 1) => {
        if (typeof page !== "number" || isNaN(page)) {
            page = 1; 
        }
    
        const dataSubmit: FilterVariantPost = {
            categoryID: filterPost.categoryID,
            keyWord: filterPost.keyWord,
            skuId: filterPost.skuId,
            supplierID: filterPost.supplierID,
            fromPrice: filterForm.fromPrice,
            toPrice: filterForm.toPrice,
        };
    
        setFilterPost(dataSubmit);
    
        VariantFilterAPI(dataSubmit, page, PAGE_LIMIT_VARIANT)
            .then(res => {
                if (res?.data) {
                    setVariants(res?.data.items);
                    setPageObject(res?.data.page);
                    toast.success("Success");
                }
            })
            .catch(error => toast.error(error));
    };
    

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
            label: "Variant's Images",
            render: (variant: VariantGet) =>
            (
                <ul className="list-group list-group-flush" style={{ minWidth: "132px" }} >
                    <div >
                        {
                            variant.images.length > 0
                                ? (variant.images.slice(0, 3).map(img => (
                                    <img
                                        className="rounded-circle img-fluid me-2"
                                        src={`${BASE_URL}/${img.imageUrl}`}
                                        alt=""
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                )))
                                : (
                                    <div className='d-flex align-items-center' >
                                        <img
                                            className="rounded-circle img-fluid me-2"
                                            src={`${BASE_URL}/${variant.baseImage}`}
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
                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(variant.salePrice),
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
                <div className="rounded-2 border shadow custom-container h-100 " style={{ padding: "58px" }}>
                    <div className='d-flex' >
                        <h3 className='m-auto my-3' >Filter Variants</h3>
                    </div>
                    <Filter
                        handleClearForm={handleClearForm}
                        onSubmitFilter={onSubmitFilter}
                        handleOnchangeSku={handleOnchangeSku}
                        handleOnchangeKeyword={handleOnchangeKeyword}
                        handleSelectedCategory={handleSelectedCategory}
                        handleSelectedSupplier={handleSelectedSupplier}
                    />
                    <div className='d-flex' >
                        <h3 className='m-auto my-3' >Variant List   </h3>
                    </div>
                    {variants
                        ? <Table
                            configs={configs}
                            data={variants}
                            onClickRecord={handleClickRecordTB}
                        />
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

export default Variant
