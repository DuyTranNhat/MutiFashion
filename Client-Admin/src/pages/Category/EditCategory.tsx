// Editcategory.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CategoryUpdate } from '../../Models/Category';
import { categoryGetByIdAPI, categoryUpdateAPI } from '../../Services/CategoryService';
import FormCategory, { CategoryFormInput } from './FormCategory';

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategoies] = useState<CategoryUpdate | null>(null);


  useEffect(() => {
    if (id) {
      categoryGetByIdAPI(id)
        .then((res) => {
          if (res?.data) {
            setCategoies(res.data);
          }
        })
        .catch((error) => {
          toast.warning(error);
        });
    }
  }, [id]);

  const handleEditSubmit = (form: CategoryFormInput) => {
    if (!id) return;
    const dataUpdate: CategoryUpdate = {
      name: form.name,
    }
    
    categoryUpdateAPI(id, dataUpdate)
      .then((res) => {
        if (res?.status === 200) {
          toast.success('category updated successfully!');
          navigate('/category'); // Điều hướng về trang danh sách nhà cung cấp
        }
      })
      .catch((error) => {
        toast.warning(error);
      });
  };

  return (
    <div className="rounded h-100 p-4 custom-container">
      <h6 className="mb-4">Edit category</h6>
      {categories ? (
        <FormCategory onSubmitForm={handleEditSubmit} Category={categories} />
      ) : (
        <p>Loading category data...</p>
      )}
    </div>
  );
};

export default EditCategory;
