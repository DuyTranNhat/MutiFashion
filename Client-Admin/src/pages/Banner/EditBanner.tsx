import React, { useEffect, useState } from 'react';
import FormBanner from './FormBanner';
import { toast } from 'react-toastify';
import { bannerGetByIdAPI } from '../../Services/BannerService'; // Adjust import paths as needed
import { useParams, useNavigate } from 'react-router-dom';
import { BannerGet } from '../../Models/Banner';

const EditBanner: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Assuming the ID comes from the route parameters
    const navigate = useNavigate();
    const [bannerData, setBannerData] = useState<BannerGet | null>(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                if (id) {
                    const res = await bannerGetByIdAPI(id);
                    if (res?.data) {
                        setBannerData(res.data);
                    }
                }
            } catch (error) {
                toast.error('Error fetching banner');
            }
        };

        if (id) {
            fetchBanner();
        }
    }, [id]);

    if (!bannerData) {
        return <div>Loading...</div>; // Show a loading indicator until the data is fetched
    }

    return (
        <div className="rounded h-100 p-4">
            <FormBanner
                initialData={{
                    id: bannerData.slideId,             // Slide ID
                    title: bannerData.title,             // Title
                    link: bannerData.link,               // Link
                    image: bannerData.imageUrl,             // Image URL
                    description: bannerData.description, // Description
                }}
                isUpdate={true}
            />
        </div>
    );
};

export default EditBanner;
