import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bannerPostAPI, bannerUpdateAPI } from '../../Services/BannerService';
import { BASE_URL } from '../../Utils/constant';

interface FormBannerProps {
  initialData?: {
    id?: number;
    title: string;
    link: string;
    image?: string; // Image URL string from initial data
    description: string;
    status?: boolean; // Optional status for the update
  };
  isUpdate?: boolean;
  onSuccess?: () => void;
}

const FormBanner: React.FC<FormBannerProps> = ({ initialData, isUpdate = false, onSuccess }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [link, setLink] = useState(initialData?.link || '');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState(initialData?.status ?? true); // Use initial data status or default to true

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setLink(initialData.link);
      setDescription(initialData.description);
      setStatus(initialData.status ?? true); 

      if (isUpdate && initialData.image) {
        setImagePreview(`${BASE_URL}/${initialData.image}`);
      }
    }
  }, [initialData, isUpdate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !link || !description) {
      toast.error('All fields except image are required');
      return;
    }

    const formData = new FormData();
    formData.append('SlideId', String(initialData?.id)); 
    formData.append('Title', title);
    formData.append('Link', link);
    formData.append('Description', description);
    formData.append('Status', String(status)); 

    if (image) {
      formData.append('ImageFile', image);
    }

    try {
      if (isUpdate && initialData?.id) {
        const res = await bannerUpdateAPI(initialData.id, formData);
        if (res?.status === 201) {
          toast.success('Slide updated successfully');
          navigate('/banner');
        }
      } else {
        const res = await bannerPostAPI(formData);
        if (res?.status === 201) {
          toast.success('Slide created successfully');
          navigate('/banner');
        }
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Failed to save slide');
    }
  };

  return (
    <form className="col-12 shadow my-4 border-2" onSubmit={handleSubmit}>
      <div className=" rounded h-100 custom-container m-4 p-4">
        <h6 className="mb-4">{isUpdate ? 'Update Slide' : 'Create a new Slide'}</h6>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="titleInput"
            placeholder="Slide Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="titleInput">Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="url"
            className="form-control"
            id="linkInput"
            placeholder="Slide Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
          <label htmlFor="linkInput">Link</label>
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Image
          </label>
          {imagePreview && (
            <div className="mb-3">
              <img
              style={{ height: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: "25px" }}
                src={imagePreview}
                alt="Current Slide"
              />
            </div>
          )}
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="descriptionInput"
            placeholder="Slide Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ height: '150px' }}
          />
          <label htmlFor="descriptionInput">Description</label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="statusCheck"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="statusCheck">
            Active Status
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          {isUpdate ? 'Update Slide' : 'Create Slide'}
        </button>
      </div>
    </form>
  );
};

export default FormBanner;
