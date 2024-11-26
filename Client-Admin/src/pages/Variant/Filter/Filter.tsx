import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { PiBroom } from 'react-icons/pi'
import { supplierGetAPI } from '../../../Services/SupplierService'
import { SupplierGet } from '../../../Models/Supplier'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { categoryGetAPI } from '../../../Services/CategoryService'
import { CategoryGet } from '../../../Models/Category'

const validateSchema = yup.object().shape({
    fromPrice: yup.number().nullable().min(0.01, 'Price must be more $0.01')
        .max(10000000, 'Price cannot beyond $1.000.000'),
    toPrice: yup.number().nullable().min(0.01, 'Price must be more $0.01')
        .max(10000000, 'Price cannot beyond $1.000.000')
})

export type FilterForm = {
    fromPrice?: number | null;
    toPrice?: number | null;
}

export type Props = {
    handleClearForm: () => void;
    onSubmitFilter: (data: FilterForm) => void
    handleSelectedSupplier: (idSupplier: number) => void;
    handleSelectedCategory: (idCategory: number) => void;
    handleOnchangeSku: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnchangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const Filter = ({
    onSubmitFilter,
    handleClearForm,
    handleOnchangeSku,
    handleOnchangeKeyword,
    handleSelectedSupplier,
    handleSelectedCategory
}: Props) => {
    const [suppliers, setSuppliers] = useState<SupplierGet[]>([])
    const [categories, setCategories] = useState<CategoryGet[]>([])

    const {
        reset,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FilterForm>({
        resolver: yupResolver(validateSchema),
        defaultValues: {
            fromPrice: null,
            toPrice: null
        },
    });

    useEffect(() => {
        supplierGetAPI()
            .then(res => {
                if (res?.data) {
                    setSuppliers(res?.data.items)
                }
            })

        categoryGetAPI(1, 100)
            .then(res => {
                if (res?.data) {
                    setCategories(res?.data.items)
                }
            })
    }, [])

    const clearFilterData = () => {
        reset({ fromPrice: null, toPrice: null });

        const keywordInput = document.getElementById("exampleInputEmail1") as HTMLInputElement | null;
        if (keywordInput) {
            keywordInput.value = "";
        }

        const categorySelect = document.getElementById("catergory-select") as HTMLSelectElement | null;
        if (categorySelect) {
            categorySelect.selectedIndex = 0;
        }

        const supplierSelect = document.getElementById("supplier-select") as HTMLSelectElement | null;
        if (supplierSelect) {
            supplierSelect.selectedIndex = 0;
        }

        const IDSkuInput = document.getElementById("IDSkuInput") as HTMLInputElement | null;
        if (IDSkuInput) {
            IDSkuInput.value = "";
        }
    };

    return (
        <div onSubmit={handleSubmit(onSubmitFilter)} className='border-1 border rounded-3 mb-4 p-4' >
            <form>
                <div className='row' >
                    <div className='col-6' >
                        <div className="mb-3 form-floating">
                            <div id="emailHelp" className="form-text">
                                <label htmlFor="exampleInputEmail1" className="fw-bold form-label">Keyword</label>
                                <input className="form-control" id="exampleInputEmail1"
                                    onChange={e => handleOnchangeKeyword(e)}
                                    placeholder='Keyword'
                                    aria-describedby="emailHelp" />
                            </div>
                        </div>

                        <label style={{ color: "rgb(33 37 41 / 75%)", fontSize: ".875rem", marginTop: "4px" }}
                            htmlFor="exampleInputEmail1" className="fw-bold form-label">Category</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            id="catergory-select"

                            onChange={e => handleSelectedCategory(Number(e.target.value))}
                        >
                            <option selected>Catogory Default</option>
                            {categories.map(category =>
                                <option
                                    key={category.categoryId}
                                    value={category.categoryId}
                                >{category.name}
                                </option>)}
                        </select>

                        <label style={{ color: "rgb(33 37 41 / 75%)", fontSize: ".875rem", marginTop: "4px" }}
                            htmlFor="exampleInputEmail1" className="fw-bold form-label">Supplier</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            id="supplier-select"

                            onChange={e => handleSelectedSupplier(Number(e.target.value))}
                        >
                            <option selected>Supplier Default</option>
                            {suppliers.map(supplier =>
                                <option
                                    key={supplier.supplierId}
                                    value={supplier.supplierId}
                                >{supplier.name}
                                </option>)}
                        </select>
                    </div>

                    <div className='col-6' >
                        <div className="mb-3 form-floating">
                            <div id="emailHelp" className="form-text">
                                <label htmlFor="IDSkuInput" className="fw-bold form-label">SKU Variant</label>
                                <input className="form-control" id="IDSkuInput"
                                    onChange={e => handleOnchangeSku(e)}
                                    placeholder='SKU Variant'
                                    aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className='row' >
                            <div className="col-6">
                                <div className="mb-3 form-floating">
                                    <div id="emailHelp" className="form-text">
                                        <label htmlFor="exampleInputEmail1" className="fw-bold form-label">Rang Of Price From</label>
                                        <input
                                            className={`form-control ${errors.fromPrice ? 'is-invalid' : ''}`}
                                            id="exampleInputEmail1"
                                            placeholder='$0.01'
                                            {...register('fromPrice')}
                                            aria-describedby="emailHelp" />
                                        {errors.fromPrice && <div className="invalid-feedback">{errors.fromPrice.message}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3 form-floating">
                                    <div id="emailHelp" className="form-text">
                                        <label htmlFor="exampleInputEmail1" className="fw-bold form-label">Rang Of Price To</label>
                                        <input
                                            className={`form-control ${errors.toPrice ? 'is-invalid' : ''}`}
                                            id="exampleInputEmail1"
                                            placeholder='$1000000'
                                            aria-describedby="emailHelp"
                                            {...register('toPrice')}
                                        />
                                        {errors.toPrice && <div className="invalid-feedback">{errors.toPrice.message}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex mt-3 justify-content-center  ' >
                            <button className="me-2 btn btn-success d-flex align-items-center">
                                <PiBroom
                                    className='me-2'
                                    fontSize={'12px'}
                                />
                                <span
                                    onClick={() => {
                                        handleClearForm()
                                        clearFilterData()
                                    }}
                                >Clear Form</span>
                            </button>

                            <button type="submit" className="btn btn-primary d-flex align-items-center">
                                <FaSearch
                                    className='me-2'
                                    fontSize={'12px'}
                                />
                                <span>Search</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default Filter
