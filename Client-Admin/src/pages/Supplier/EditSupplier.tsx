// EditSupplier.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormSupplier, { SupplierFormInput } from './FormSupplier';
import { supplierPutAPI, supplierGetByIdAPI } from '~/Services/SupplierService';

const EditSupplier = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const [supplier, setSupplier] = useState<SupplierFormInput | null>(null);


  // Fetch data of the supplier when component loads
  useEffect(() => {
    if (id) {
      supplierGetByIdAPI(id)
        .then((res) => {
          if (res?.data) {
            setSupplier(res.data); // Set dữ liệu nhà cung cấp vào state
          }
        })
        .catch((error) => {
          toast.warning(error);
        });
    }
  }, [id]);

  // Handle form submission
  const handleEditSubmit = (form: SupplierFormInput) => {
    if (!id) return;
    supplierPutAPI(id, form)
      .then((res) => {
        if (res?.status === 200) {
          toast.success('Supplier updated successfully!');
          navigate('/admin/supplier'); // Điều hướng về trang danh sách nhà cung cấp
        }
      })
      .catch((error) => {
        toast.warning(error);
      });
  };

  return (
    <div className="rounded h-100 p-4 custom-container">
      <h6 className="mb-4">Edit Supplier</h6>
      {supplier ? (
        <FormSupplier handleSupllier={handleEditSubmit} supplier={supplier} />
      ) : (
        <p>Loading supplier data...</p>
      )}
    </div>
  );
};

export default EditSupplier;
