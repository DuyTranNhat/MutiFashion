import React, { useEffect, useState } from 'react'
import './UploadImage.css'
import DefaultImage from '/img/DefaultImage.png'

export type Props = {
    handleSetImage: (image: File) => void
}

const UploadImage = ({ handleSetImage }: Props) => {
    const [imagePreview, setImagePreview] = useState<string>(DefaultImage);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files?.[0];
            handleSetImage(file)
            setImagePreview(URL.createObjectURL(file));
        }
    }

    return (
        <div className="avatar-wrapper">
            <img className="profile-pic" src={imagePreview} />
            <div className="upload-button">
                <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
            </div>
            <input
                className="file-upload"
                type="file" accept="image/*"
                onChange={e => handleImageChange(e)}
            />
        </div>
    )
}

export default UploadImage
