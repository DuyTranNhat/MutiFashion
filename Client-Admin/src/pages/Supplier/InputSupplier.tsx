import React from 'react'
import { useForm } from 'react-hook-form'
import FormSupplier, { SupplierFormInput } from './FormSupplier'
import { supplierPostAPI } from '~/Services/SupplierService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const InputSupplier = () => {
    const navigate = useNavigate()
    
    const handleSubmit = (formInput: SupplierFormInput) => {
        supplierPostAPI(formInput) 
        .then(res => {
            if(res?.status == 200) {
                toast.success("Add successfully!");
                navigate("/admin/supplier")
            }
        }).catch(error => toast.warning(error))
    }

    return (
        <div>
            <div className="custom-container m-4 rounded h-100 p-4">
                <h6 className="mb-4">Add a new supplier</h6>
                <FormSupplier handleSupllier={handleSubmit}  />
            </div>
        </div>
    )
}

export default InputSupplier
