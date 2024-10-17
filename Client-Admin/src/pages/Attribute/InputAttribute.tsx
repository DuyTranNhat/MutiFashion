import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import FormAttrbute, { AttributeFormInput } from './FormAttrbute'
import { attributePostAPI } from '../../Services/AttributeService'

const InputAttribute = () => {
    const navigate = useNavigate();


    const handleAttribute = (formInput: AttributeFormInput) => {
        attributePostAPI(formInput)
        .then(res => {
            if (res?.status == 201) {
                navigate("/attributes")
                toast.success("add successfully")
            }
        }).catch(error => toast.error(error))
    }

    return (
            <div className="rounded h-100 p-4">
                <h6 className="mb-4">Create a new attribute for variant</h6>

                <FormAttrbute handleAttribute={handleAttribute}  />
            </div>
    )
}

export default InputAttribute
