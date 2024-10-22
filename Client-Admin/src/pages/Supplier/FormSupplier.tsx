import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';  

export type SupplierFormInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: boolean;
  notes: string;
};

type Props = {
  handleSupllier: (data: SupplierFormInput) => void;
  supplier?: SupplierFormInput; // Props mới để nhận thông tin nhà cung cấp
};

const validation = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  status: yup.boolean().required(),
  notes: yup.string().required('Notes are required'),
});

const FormSupplier = ({ handleSupllier, supplier }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SupplierFormInput>({
    resolver: yupResolver(validation),
    defaultValues: supplier || { name: '', email: '', phone: '', address: '', status: false, notes: '' }, // Dùng defaultValues để điền vào form
  });

  return (
    <form onSubmit={handleSubmit(handleSupllier)} className='rounded-2 border shadow' style={{padding: "58px"}} >
      {/* Input Name */}
      <div className="form-floating mb-3">
        <input
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="floatingName"
          placeholder="Name's supplier"
          {...register('name')}
        />
        <label htmlFor="floatingName">Supplier Name</label>
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>

      {/* Input Email */}
      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="floatingEmail"
          placeholder="name@example.com"
          {...register('email')}
        />
        <label htmlFor="floatingEmail">Email Address</label>
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
      </div>

      {/* Input Phone */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          id="floatingPhone"
          placeholder="Phone number"
          {...register('phone')}
        />
        <label htmlFor="floatingPhone">Phone</label>
        {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
      </div>

      {/* Input Address */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          id="floatingAddress"
          placeholder="Supplier address"
          {...register('address')}
        />
        <label htmlFor="floatingAddress">Address</label>
        {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
      </div>

      {/* Toggle Status */}
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="floatingStatus"
          {...register('status')}
        />
        <label className="form-check-label" htmlFor="floatingStatus">
          Status
        </label>
      </div>

      {/* Textarea Notes */}
      <div className="form-floating mb-3">
        <textarea
          className={`form-control ${errors.notes ? 'is-invalid' : ''}`}
          placeholder="Leave a note here"
          id="floatingTextarea"
          style={{ height: '150px' }}
          {...register('notes')}
        ></textarea>
        <label htmlFor="floatingTextarea">Notes</label>
        {errors.notes && <div className="invalid-feedback">{errors.notes.message}</div>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormSupplier;
