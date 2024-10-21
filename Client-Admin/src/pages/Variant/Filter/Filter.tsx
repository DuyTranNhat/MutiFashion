import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { PiBroom } from 'react-icons/pi'
import { supplierGetAPI } from '../../../Services/SupplierService'
import { SupplierGet } from '../../../Models/Supplier'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const validateSchema = yup.object().shape({
    fromPrice: yup.number().nullable().min(1000, 'Price must be more 1,000 VNĐ')
        .max(10000000, 'Price cannot beyond 10,000,000 VNĐ'),
    toPrice: yup.number().nullable().max(10000000, 'Price must be more 1,000 VNĐ')
        .max(10000000, 'Price cannot beyond 10,000,000 VNĐ')
})

export type FilterForm = {
    fromPrice?: number | null;
    toPrice?: number | null;
}

export type Props = {
    handleSelectedSupplier: (idSupplier: number) => void;
    handleOnchangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnchangeSku: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitFilter: (data: FilterForm) => void
}


const Filter = ({
    handleOnchangeSku,
    handleOnchangeKeyword,
    handleSelectedSupplier,
    onSubmitFilter
}: Props) => {
    const [suppliers, setSuppliers] = useState<SupplierGet[]>([])

    const {
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
    }, [])

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
                            aria-label="Default select example
                             " id="catergory-select"
                        >
                            <option selected>Catogory Default</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>

                        <label style={{ color: "rgb(33 37 41 / 75%)", fontSize: ".875rem", marginTop: "4px" }}
                            htmlFor="exampleInputEmail1" className="fw-bold form-label">Keyword</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            id="catergory-select"

                            onChange={e => handleSelectedSupplier(Number(e.target.value))}
                        >
                            <option selected>Open this select menu</option>
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
                                <label htmlFor="exampleInputEmail1" className="fw-bold form-label">SKU Variant</label>
                                <input className="form-control" id="exampleInputEmail1"
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
                                            placeholder='1,000VNĐ'
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
                                            placeholder='10,000,000VNĐ'
                                            aria-describedby="emailHelp" 
                                            {...register('toPrice')}
                                            />
                                    </div>
                                    {errors.toPrice && <div className="invalid-feedback">{errors.toPrice.message}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='d-flex mt-3 justify-content-center  ' >
                            <button className="me-2 btn btn-success d-flex align-items-center">
                                <PiBroom
                                    className='me-2'
                                    fontSize={'12px'}
                                />
                                <span>Clear Form</span>
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
