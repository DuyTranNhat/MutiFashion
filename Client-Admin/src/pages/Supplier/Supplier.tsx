import React, { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../../Components/Table/Table';
import { SupplierGet } from '../../Models/Supplier'
import { supplierGetAPI, supplietUpfateStatusAPI } from '../../Services/SupplierService';

const Supplier = () => {
    const [suppliers, setSuppliers] = useState<SupplierGet[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getSuppliers = () => {
            supplierGetAPI()
                .then(res => {
                    if (res?.data) {
                        setSuppliers(res?.data.items);
                    }
                }).
                catch(error => {
                    toast.warning(error)
                    setSuppliers([])
                })
        }
        getSuppliers()
    }, [])



    const onStatusChange = (supplierID: number) => {
        updateStatusAPI(supplierID)

    }

    const updateStatusAPI = (supplierID: number) => {
        supplietUpfateStatusAPI(supplierID)
            .then(res => {
                if (res?.data) {
                    const updateSuppliers = suppliers.map(supllier => {
                        return supllier.supplierId == res?.data.supplierId
                            ? { ...supllier, status: res?.data.status }
                            : supllier
                    })

                    setSuppliers(updateSuppliers)
                }
            })
    }

    const configs = [
        {
            label: "#",
            render: (supplier: SupplierGet, index: number) => index + 1,
        },
        {
            label: "supplier's Name",
            render: (supplier: SupplierGet) => supplier.name,
        },
        {
            label: "supplier's Email",
            render: (supplier: SupplierGet) => supplier.email,
        },
        {
            label: "supplier's Phone",
            render: (supplier: SupplierGet) => supplier.phone,
        },
        {
            label: "supplier's Address",
            render: (supplier: SupplierGet) => supplier.address,
        },
        {
            label: "supplier's Status",
            render: (supplier: SupplierGet) =>
            (
                <td>
                    <div className="form-check form-switch ">
                        <input className="form-check-input " type="checkbox" id="flexSwitchCheckDefault" onChange={() => onStatusChange(supplier.supplierId)} checked={supplier.status} />
                    </div>
                </td>
            )
            ,
        },

        {
            label: "Action",
            render: (supplier: SupplierGet) => {
                return <td className='d-flex' >
                    <button type="button"
                        className="btn-sm btn-success d-flex align-items-center me-2"
                        onClick={() => navigate(`/supplier/edit/${supplier.supplierId}`)}>
                        <FaPen className='' />
                    </button>
                </td>
            }
        }
    ]


    return (
        <div className='container-fluid pt-4 px-4' >
            <h1 className='py-3' >Supplier Management</h1>
            <div className="col-12">
                <div className="rounded-2 border shadow custom-container h-100" style={{padding: "18px 58px"}}>
                    <div style={{height: "100px"}} className='d-flex align-items-center' >
                        <h6 className="">Supplier List</h6>
                        <button className='ml-auto btn btn-primary ms-auto'
                            onClick={() => { navigate("/supplier/create") }}
                        >
                            Create a new supplier

                        </button>
                    </div>
                    <div className="table-responsive"></div>
                    {suppliers
                        ? (<Table data={suppliers} configs={configs} />)
                        : <h1>Loading</h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default Supplier
