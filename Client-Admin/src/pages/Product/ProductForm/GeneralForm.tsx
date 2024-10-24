import { useEffect, useState } from "react"
import { SupplierGet } from "../../../Models/Supplier"
import { supplierGetAPI } from "../../../Services/SupplierService"
import { toast } from "react-toastify"

type Props = {
    register: any,
    error: any
}

export const GeneralForm = ({
    register,
    error
}: Props) => {
    const [suppliers, setSuppliers] = useState<SupplierGet[]>([]);

    useEffect(() => {
        supplierGetAPI()
            .then((res) => {
                if (res?.data) {
                    setSuppliers(res?.data.items)
                }
            }).catch(error => toast.error(error))
    }, [])


    return (
        <>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className={`form-control ${error.name ? 'is-invalid' : ''}`}
                    placeholder="Product's Name"
                    {...register('name')}
                />
                <label htmlFor="name">Product's Name</label>
                {error.name && 
                <>
                    {toast.error(error.name.message)}
                    <div className="invalid-feedback">{error.name.message}</div>
                </>
                }
            </div>

            <div className="form-floating mb-3">
                <textarea
                    className={`form-control ${error.description ? 'is-invalid' : ''}`}
                    style={{ height: '200px' }}
                    placeholder="Product Description"
                    {...register('description')}
                />
                <label htmlFor="description">Description Product</label>
                {error.description && <div className="invalid-feedback">{error.description.message}</div>}
            </div>

            <div className="form-floating mb-3">
                <input
                    className={`form-control ${error.salePrice ? 'is-invalid' : ''}`}
                    type="number"
                    id="salePrice"
                    name="salePrice"
                    step="1"
                    required
                    placeholder="Nhập giá bán"
                    {...register('salePrice')}
                />
                <label htmlFor="salePrice">Giá bán:</label>
                {error.salePrice && <div className="invalid-feedback">{error.salePrice.message}</div>}
            </div>

            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    {...register('status')}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                    Active to display filter on shop
                </label>
            </div>

            <select
                className={`form-select form-select-lg mt-3 mb-3 ${error.categoryId ? 'is-invalid' : ''}`}
                aria-label=".form-select-lg example"
                {...register('categoryId')}
            >
                <option value={-1}>Select Category</option>
                {/* {attributes.map(attribute => (
                    <option
                        key={attribute.optionID}
                        value={attribute.optionID}
                    >
                        {attribute.name}
                    </option>
                ))} */}
            </select>
            {error.categoryId && <div className="invalid-feedback">{error.categoryId.message}</div>}

            <select
                className={`form-select form-select-lg mb-3 ${error.supplierId ? 'is-invalid' : ''}`}
                aria-label=".form-select-lg example"
                {...register('supplierId')}
            >
                <option value={-1}>Select Supplier</option>
                {suppliers.map(supplier => (
                    <option
                        key={supplier.supplierId}
                        value={supplier.supplierId}
                    >
                        {supplier.name}
                    </option>
                ))}
            </select>
            {error.supplierId && <div className="invalid-feedback">{error.supplierId.message}</div>}
        </>
    )
}

export default GeneralForm
