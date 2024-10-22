import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
  Category?: CategoryFormInput | null;
  onSubmitForm: (form: CategoryFormInput) => void;
};

export type CategoryFormInput = {
  name: string;
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(255, 'Name is too long'),
});


const FormCategory = ({ onSubmitForm, Category }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: Category || { name: '' },
  });

  const onSubmit = (data: CategoryFormInput) => {
    onSubmitForm(data);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='rounded-2 border shadow' style={{ padding: "42px" }} >
      <hr />
      <h6 className='mb-4'>Category</h6>
      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          placeholder="Category Name"
          {...register('name')}
        />
        <label htmlFor="name">Category Name</label>
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form >
  );
};

export default FormCategory;
