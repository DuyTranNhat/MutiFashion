import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import VariantImages from '../../../Components/VariantImage/VariantImages';
import { ImageGet } from '../../../Models/Variant';
import { ImageVariantDelete, ImgListGetByIDVariantAPI, upLoadListImageAPI } from '../../../Services/VariantService';
import UploadListImage from '../../../Components/UploadImage/UploadListImage';

type Props = {
    id: string
}

const ImageVariantDetails = ({ id }: Props) => {
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
    const [images, setImages] = useState<ImageGet[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            if (id) {
                try {
                    const res = await ImgListGetByIDVariantAPI(id);
                    if (res?.data) {
                        setImages(res.data);
                    } else {
                        toast.error('No images found for this variant.');
                    }
                } catch (error) {
                    toast.error('Error fetching images: ' + error);
                }
            }
        };

        fetchImages();
    }, [id]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedImages(event.target.files);
    };

    const handleUpload = () => {
        if (id) {
            upLoadListImageAPI(selectedImages, Number(id))
                .then(res => {
                    if (res?.status == 200) {
                        setImages(res?.data)
                        toast.success("Images uploaded successfully!")
                    }
                }).catch(error => toast.error(error))
        }
    }

    const handleDelete = (idImage: number) => {
        if (id && idImage) {
            ImageVariantDelete(idImage)
                .then(res => {
                    if (res?.status === 204) {
                        toast.success("Delete successfully!")
                        setImages(prev => prev.filter(img => 
                            img.imageId !== idImage
                        ))
                    }
                }).catch(err => toast.error(err))
        }
    }

    return (
        <div className="container-fluid service p-4" >
            <div className="container row flex-column" style={{ padding: "0 62px" }}>
                <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.2s">
                    <h4 className="display-3 text-center mb-4">Variant Images Management</h4>

                </div>

                <div className='d-flex justify-content-center' >
                    <UploadListImage
                        handleImageChange={handleImageChange}
                        handleUpload={handleUpload}
                        selectedImages={selectedImages}
                    />
                </div>

                <div className="row g-4 justify-content-center">
                    <VariantImages
                        images={images}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageVariantDetails;
