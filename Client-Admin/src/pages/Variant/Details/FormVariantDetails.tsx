import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { VariantUpdatedGet, VariantUpdatedPost } from '../../../Services/VariantService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export type VariantUpdateDto = {
  name: string;
  status: boolean;
  description: string | null;
};

type Props = {
  idVariant: number;
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(255, 'Name is too long'),
  status: yup.boolean().required('Status is required'),
  description: yup
    .string()
    .required()
    .nullable()
    .max(500, 'Description is too long'),
});

const FormVariantDetails = ({ idVariant }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VariantUpdateDto>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      status: false,
      description: '',
    },
  });

  const navigate = useNavigate()

  useEffect(() => {
    VariantUpdatedGet(idVariant)
      .then((res) => {
        if (res?.data) {
          reset(res.data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch variant data:', err);
      });
  }, [idVariant, reset]);

  const onSubmit = (dataPost: VariantUpdateDto) => {
    VariantUpdatedPost(dataPost)
      .then(res => {
        if (res?.status === 204) {
          toast.success("Update successfully!")
          navigate("/variant")
        }
      }).catch(err => toast.error(err))
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2 border shadow"
      style={{ padding: '42px' }}
    >
      <h6 className="mb-4">Variant Details</h6>

      {/* Field: Name */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          placeholder="Name"
          {...register('name')}
        />
        <label htmlFor="name">Name</label>
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>

      {/* Field: Status */}
      <div className="form-check form-switch mb-3">
        <input
          type="checkbox"
          className={`form-check-input ${errors.status ? 'is-invalid' : ''}`}
          {...register('status')}
        />
        <label htmlFor="status" className="form-check-label">
          Status
        </label>
        {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
      </div>

      {/* Field: Description */}
      <div className="form-floating mb-3">
        <textarea
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          placeholder="Description"
          {...register('description')}
          style={{ height: '100px' }}
        />
        <label htmlFor="description">Description</label>
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormVariantDetails;
