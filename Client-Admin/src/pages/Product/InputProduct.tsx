import { ProductPost } from '../../Models/Product'
import FormProduct from './ProductForm/FormProduct'
import { productPostAPI } from '../../Services/ProductService';
import { toast } from 'react-toastify';


const InputProduct = () => {
 
  const handleSubmitProduct = (dataPost: ProductPost) => {
    productPostAPI(dataPost)
    .then((res) => {
        if (res?.data) {
            toast.success('Success');
        }
    })
    .catch((error) => toast.error(error));
  }

  return (
    <div style={{ padding: "58px" }} className='bg-light' >
    <h3 className='py-3' >Create New Product</h3>
      <div className='rounded-2 border shadow' style={{ padding: "58px" }}>
          <FormProduct onSubmit={handleSubmitProduct} />
      </div>
    </div>
  )
}

export default InputProduct
