import React, { useState } from 'react';
import { GENERALINFORM, TAB_CREATEPRODUCT, VARIANT_ATTRIBUTE } from '../../../Utils/constant';
import * as yup from 'yup';
import GeneralForm from './GeneralForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductAttributePost, ProductPost } from '../../../Models/Product';
import { valueInput } from '../../../Components/Propper/SearchPropper';
import AttributeForm from './AttributeForm';
import UploadImage from '../../../Components/UploadImage/UploadImage';
import { toast } from 'react-toastify';

type Props = {
    onSubmit: (data: ProductPost, image: File) => void;
};

const validateSchema = yup.object().shape({
    name: yup.string().required('Name is required').max(255, 'Name cannot over 255 characters'),
    description: yup.string().max(1000, 'Description is too long').nullable().default(''),
    categoryId: yup.number().nullable().default(-1),
    supplierId: yup.number().nullable().default(-1),
    status: yup.boolean().default(false),
    salePrice: yup.number().required().min(1000, 'Price must be more 1,000 VNĐ')
        .max(10000000, 'Price cannot beyond 10,000,000 VNĐ')
});

export type ProductForm = {
    name: string;
    categoryId: number | null;
    supplierId: number | null;
    salePrice: number;
    description: string | null;
    status: boolean;
};

const ProductForm = ({ onSubmit }: Props) => {
    const [tab, setTab] = useState<string>(TAB_CREATEPRODUCT[0].id);
    const [attributePost, setAttributePost] = useState<ProductAttributePost[]>([]);
    const [image, setImage] = useState<File | null>(null); // Manage image file

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<ProductForm>({
        resolver: yupResolver(validateSchema),
        defaultValues: {
            name: '',
            categoryId: null,
            supplierId: null,
            description: '',
            salePrice: 1000,
            status: false,
        },
    });

    const handleCreateAttPost = (attInput: valueInput[], valueInput: valueInput[]) => {
        setAttributePost((prev) => {
            const newValues = valueInput.map((item) => item.value);
            return [...prev, { optionName: attInput[0].value, values: newValues }];
        });
    };

    const clearAllSetAtt = () => {
        setAttributePost([]);
    };

    const deleteRowAtt = (indexInput: number) => {
        setAttributePost((prev) => prev.filter((_, index) => index !== indexInput));
    };

    const handleSelectTab = (tab: string) => {
        setTab(tab);
    };

    const handleSetImage = (image: File) => {
        setImage(image);
    };

    const hanleProductForm = (data: ProductForm) => {
        if (!image) {
            toast.error('Please choose an image for the product!');
            return;
        }

        const dataSubmit: ProductPost = {
            status: false,
            name: data.name,
            description: data.description,
            salePrice: data.salePrice,
            categoryId: data.categoryId,
            supplierId: data.supplierId,

            options: attributePost,
        };

        onSubmit(dataSubmit, image)
    };

    return (
        <div className="position-relative">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {TAB_CREATEPRODUCT.map((item) => (
                    <li className="nav-item" role="presentation" key={item.id}>
                        <button
                            className={`nav-link ${tab === item.id ? 'active' : ''}`}
                            onClick={() => handleSelectTab(item.id)}
                            value={item.id}
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit(hanleProductForm)}>
                <div className="position-absolute" style={{ position: 'absolute', top: 0, right: 240 }}>
                    <UploadImage handleSetImage={handleSetImage} />
                </div>
                <div style={{ height: '240px' }}></div>
                {tab === GENERALINFORM && (
                    <GeneralForm
                        register={register}
                        error={errors}
                    />
                )}

                <button type="submit" className="my-4 btn btn-primary">
                    Submit
                </button>
            </form>
            {tab === VARIANT_ATTRIBUTE && (
                <AttributeForm
                    deleteRowAtt={deleteRowAtt}
                    clearAllSetAtt={clearAllSetAtt}
                    handleCreateAttPost={handleCreateAttPost}
                    attributePost={attributePost}
                />
            )}
        </div>
    );
};

export default ProductForm;
