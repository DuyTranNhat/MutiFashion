import React, { useEffect, useState } from 'react'
import { CategoryGet } from '../../Models/Category';
import { useNavigate } from 'react-router-dom';
import { PageObject } from '../../Models/Common';
import Table from '../../Components/Table/Table';
import Paging from '../../Components/Paging/Paging';
import { FaPen } from 'react-icons/fa';
import { categoryGetAPI, categoryUpdateStatusAPI } from '../../Services/CategoryService';
import { PAGE_LIMIT_CATEGORY } from '../../Utils/constant';
import { toast } from 'react-toastify';

const Category = () => {
    const [categories, setCategories] = useState<CategoryGet[]>([]);
    const [pageObject, setPageObject] = useState<PageObject>()

    const navigate = useNavigate();

    useEffect(() => {
        const getcategories = () => {
            categoryGetAPI(1, PAGE_LIMIT_CATEGORY)
                .then(res => {
                    if (res?.data) {
                        setCategories(res?.data.items);
                        setPageObject(res?.data.page);
                    }
                }).
                catch(error => {
                    toast.warning(error)
                    setCategories([])
                })
        }
        getcategories()
    }, [])


    const handlePageChange = (pageNumber: number) => {
        categoryGetAPI(pageNumber, PAGE_LIMIT_CATEGORY)
            .then(res => {
                if (res?.data) {
                    setCategories(res?.data.items)
                    setPageObject(res?.data.page)
                }
            }).catch(error => toast.error(error))
    }

    const handleActiveStatus = (idToggle: number) => {
        categoryUpdateStatusAPI(idToggle)
            .then(res => {
                if (res?.data) {
                    const updatecategories = categories.map(category =>
                        (category.categoryId === idToggle)
                            ? { ...category, activeStatus: !category.activeStatus }
                            : category
                    )

                    setCategories(updatecategories)
                }
            })
    }


    const configs = [
        {
            label: "#",
            render: (category: CategoryGet, index: number) => index + 1,
        },
        {
            label: "category's Name",
            render: (category: CategoryGet) => category.name,
        },
        {
            label: "category's Status",
            render: (category: CategoryGet) =>
            (
                <td>
                    <div className="form-check form-switch">
                        <input className="form-check-input " type="checkbox" id="flexSwitchCheckDefault"
                            onChange={() => handleActiveStatus(category.categoryId)}
                            checked={category.activeStatus} />
                    </div>
                </td>
            )
            ,
        },
        {
            label: "Action",
            render: (category: CategoryGet) => {
                return <td className='d-flex' >
                    <button type="button"
                        className="btn-sm btn-success d-flex align-items-center me-2"
                        onClick={() => navigate(`/category/edit/${category.categoryId}`)}>
                        <FaPen />
                    </button>
                </td>
            }
        }
    ]

    return (
        <div>
            <div className='container-fluid pt-4 px-4' >
                <h1 className='py-3' >Category Management</h1>
                <div className="col-12">
                    <div className="rounded-2 border shadow custom-container h-100" style={{ padding: "18px 58px" }}>
                        <div style={{ height: "100px" }} className='d-flex align-items-center' >
                            <h6 className="">Category List</h6>
                            <button className='ml-auto btn btn-primary ms-auto'
                                onClick={() => { navigate("/category/create") }}
                            >
                                Create a new Category

                            </button>
                        </div>
                        <div className="table-responsive"></div>
                        <div>
                            {categories
                                ? (<Table data={categories} configs={configs} />)
                                : <h1>Loading</h1>

                            }
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
        </div>
    )
}

export default Category
