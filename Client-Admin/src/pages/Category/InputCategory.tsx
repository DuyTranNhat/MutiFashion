import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import  { CategoryFormInput } from './FormCategory'
import { CategoryPost } from '../../Models/Category'
import { categoryPostAPI } from '../../Services/CategoryService'
import FormCategory from './FormCategory'

const InputCategory = () => {
    const navigate = useNavigate();


    const handleSubmit = (formInput: CategoryFormInput) => {
        const dataPost: CategoryPost = {
            name: formInput.name
        }
        categoryPostAPI(dataPost)
            .then(res => {
                if (res?.status == 200) {
                    navigate("/category")
                    toast.success("add successfully")
                }
            }).catch(error => toast.error(error))
    }

    return (
        <div className="rounded h-100 p-4">
            <h6 className="mb-4">Create a new category for variant</h6>

            <FormCategory onSubmitForm={handleSubmit} />
        </div>
    )
}

export default InputCategory
