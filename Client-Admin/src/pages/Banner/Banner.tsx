import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../../Components/Table/Table';
import { BannerGet } from '../../Models/Banner';
import { bannerDeleteAPI, bannerGetAPI, bannerToggleActiveAPI } from '../../Services/BannerService';
import { PageObject } from '../../Models/Common';
import Paging from '../../Components/Paging/Paging';
import { BASE_URL, PAGE_LIMIT_BANNER } from '../../Utils/constant';
import { FaPen } from 'react-icons/fa';

const Banner = () => {
    const navigate = useNavigate();
    const [banners, setBanners] = useState<BannerGet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageObject, setPageObject] = useState<PageObject>()

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await bannerGetAPI();
                if (res?.data) {
                    setBanners(res.data.items);
                    setPageObject(res.data.page)
                }
            } catch (error) {
                toast.error('Error fetching banners');
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const res = await bannerDeleteAPI(id);
            if (res?.status === 204) {
                setBanners((prevBanners) => prevBanners.filter(banner => banner.slideId !== id));
                toast.success("Delete successfully");
            }
        } catch (error) {
            toast.error('Error deleting banner');
        }
    }

    const handlePageChange = (pageNumber: number) => {
        bannerGetAPI(pageNumber, PAGE_LIMIT_BANNER)
            .then(res => {
                if (res?.data) {
                    setBanners(res?.data.items)
                    setPageObject(res?.data.page)
                }
            }).catch(error => toast.error(error))
    }

    const handleClickRecord = (id: number) =>
        navigate(`/banner/edit/${id}`)

    const onStatusChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        bannerToggleActiveAPI(id)
            .then(res => {
                if (res?.status === 200) {
                    setBanners(prev => prev.map(item =>
                        (item.slideId === id)
                            ? { ...item, status: !item.status }
                            : item
                    ))
                }
            })
    }

    const configs = [
        {
            label: "#",
            render: (_: BannerGet, index: number) => index + 1,
        },
        {
            label: "Title",
            render: (banner: BannerGet) => banner.title,
        },
        {
            label: "Image",
            render: (banner: BannerGet) => (
                <img
                    className="rounded-circle img-fluid"
                    src={`${BASE_URL}/${banner.imageUrl}`}
                    alt=""
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
            ),
        },
        {
            label: "Description",
            render: (banner: BannerGet) => banner.description,
        },
        {
            label: "supplier's Status",
            render: (banner: BannerGet) =>
            (
                <td>
                    <div className="form-check form-switch">
                        <input className="form-check-input " type="checkbox" id="flexSwitchCheckDefault"
                            onChange={e => onStatusChange(banner.slideId, e)}
                            checked={banner.status} />
                    </div>
                </td>
            )
            ,
        },
        {
            label: "Action",
            render: (banner: BannerGet) => (
                <div className='d-flex'>
                    <button
                        type="button"
                        className="mt-2 btn btn-success d-flex align-items-center me-2"
                        onClick={() => navigate(`/banner/edit/${banner.slideId}`)}
                    >
                        <FaPen />
                    </button>
                </div>
            ),
        }
    ];

    return (
        <div className='container-fluid pt-4 px-4'>
            <h1 className='py-3'>Banner Management</h1>
            <div className="col-12">
                <div className="rounded-2 border shadow custom-container h-100" style={{ padding: "18px 58px" }}>
                    <div style={{ height: "100px" }} className='d-flex align-items-center' >
                        <h6 className="mb-4">Banner List</h6>
                        <button
                            className='btn btn-primary ms-auto'
                            onClick={() => navigate("/banner/create")}
                        >
                            Create a new slider
                        </button>
                    </div>
                    <div className="table-responsive">
                        {loading ? (
                            <h1>Loading...</h1>
                        ) : (
                            <Table
                                data={banners}
                                configs={configs}
                            />
                        )}
                        <Paging
                            currentPage={pageObject?.currentPage!}
                            onPageChange={handlePageChange}
                            pageSize={pageObject?.pageSize!}
                            totalItems={pageObject?.totalItems!}
                            totalPages={pageObject?.totalPages!}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
