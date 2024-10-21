import React, { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Table from '../../Components/Table/Table'
import { AttributeGet } from '../../Models/Option'
import { attributeActiveAPI, attributeGetAPI } from '../../Services/AttributeService'
import { PAGE_LIMIT_ATTRIBUTE } from '../../Utils/constant'
import { PageObject } from '../../Models/Common'
import Paging from '../../Components/Paging/Paging'

const Attribute = () => {
    const [attributes, setAttributes] = useState<AttributeGet[]>([])
    const [pageObject, setPageObject] = useState<PageObject>()

    const navigate = useNavigate()

    const activeStatus = (attributeId: number): void => { // Hàm trả về kiểu void
        attributeActiveAPI(attributeId)
            .then(res => {
                if (res?.data) {
                    setAttributes((prev: AttributeGet[]): AttributeGet[] => {
                        return prev.map((attribute: AttributeGet): any => {
                            return attribute.optionID === attributeId
                                ? { ...attribute, activeFilter: !attribute.activeFilter }
                                : attribute
                        }
                        );
                    });
                }
            }).catch(error => toast.error("Failed to update status"));
    };

    useEffect(() => {
        attributeGetAPI(1, PAGE_LIMIT_ATTRIBUTE)
            .then(res => {
                if (res?.data) {
                    setAttributes(res?.data.items)
                    setPageObject(res?.data.page);

                }
            }).catch(error => toast.error(error))
    }, [])

    const handlePageChange = (pageNumber: number) => {
        attributeGetAPI(pageNumber, PAGE_LIMIT_ATTRIBUTE)
            .then(res => {
                if (res?.data) {
                    setAttributes(res?.data.items)
                    setPageObject(res?.data.page)
                }
            }).catch(error => toast.error(error))
    }

    const configs = [
        {
            label: "#",
            render: (attributeGet: AttributeGet, index: number) => index + 1,
        },
        {
            label: "attributeGet's Name",
            render: (attributeGet: AttributeGet) => attributeGet.name,
        },
        {
            label: "attributeGet's Status",
            render: (attributeGet: AttributeGet) =>
            (
                <td>
                    <div className="form-check form-switch">
                        <input className="form-check-input " type="checkbox" id="flexSwitchCheckDefault"
                            onChange={() => activeStatus(attributeGet.optionID)}
                            checked={attributeGet.activeFilter} />
                    </div>
                </td>
            )
            ,
        },
        {
            label: "Action",
            render: (attributeGet: AttributeGet) => {
                return <td className='d-flex' >
                    <button type="button"
                        className="btn-sm btn-success d-flex align-items-center me-2"
                        onClick={() => navigate(`/attribute/edit/${attributeGet.optionID}`)}>
                        <FaPen className='me-2' />
                        Update / details
                    </button>
                </td>
            }
        }
    ]

    return (
        <div className='container-fluid pt-4 px-4' >

            <h1>Category Management</h1>
            <div className="col-12">
                <div className="rounded-2 border shadow custom-container h-100 " style={{ padding: "18px 58px" }}>
                    <div style={{ height: "100px" }} className='d-flex align-items-center' >
                        <h6 className="mb-4">Attribute List</h6>
                        <button className='btn btn-primary ms-auto'
                            onClick={() => { navigate("/attribute/create") }}
                        >
                            Create a new attribute

                        </button>
                    </div>
                    <div className="table-responsive"></div>
                    {attributes
                        ? <Table data={attributes} configs={configs} />
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
    )
}

export default Attribute
