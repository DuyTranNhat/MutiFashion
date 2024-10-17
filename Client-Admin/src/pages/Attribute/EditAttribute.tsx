import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import FormAttrbute, { AttributeFormInput } from './FormAttrbute'
import { attributeGetByIdAPI, attributeUpdateAPI } from '../../Services/AttributeService'
import { ValueGet } from '../../Models/Option'

const EditAttribute = () => {
    const [attribute, setAttribute] = useState<AttributeFormInput>()

    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            attributeGetByIdAPI(id)
                .then(res => {
                    if (res?.data) {
                        const mapperData = {
                            ...res.data,
                            values: res.data.values.map((value: ValueGet) => ({
                                ...value,
                                value: value.value ?? false, 
                            }))
                        };
                        setAttribute(mapperData)
                    }
                }).catch(error => toast.error(error))
        }
    }, [])

    const handleAttribute = (formInput: AttributeFormInput) => {
        if (id) {
            attributeUpdateAPI(id, formInput)
                .then(res => {
                    if (res?.status == 200) {
                        navigate("/attributes")
                        toast.success("update successfully")
                    }
                }).catch(error => toast.error(error))
        }
    }


    return (
        <div className="rounded h-100 p-4">
            <h6 className="mb-4">Update a new attribute for variant</h6>

            {attribute
                ? <FormAttrbute handleAttribute={handleAttribute} attribute={attribute} />
                : <h1>VscLoading....</h1>}
        </div>
    )
}

export default EditAttribute
