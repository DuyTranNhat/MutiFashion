import { ProductPost } from '../../Models/Product'
import ProductForm from './ProductForm/ProductForm'
import { productPostAPI, UploadImageProductAPI } from '../../Services/ProductService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const InputProduct = () => {
  const navigate = useNavigate()

  const handleSubmitProduct = (dataPost: ProductPost, image: File) => {
    productPostAPI(dataPost)
      .then((res) => {
        if (res?.data) {
          if (res?.status === 200) {
            const idProduct = res.data
            UploadImageProductAPI(image, idProduct)
              .then(res => {
                if (res?.status === 200) {
                  toast.success("Product created successfully!")
                  navigate("/product")
                }
              })
          }
        }
      })
      .catch((error) => toast.error(error));
  }

  return (
    <div style={{ padding: "58px" }} className='bg-light' >
      <h3 className='py-3' >Create New Product</h3>
      <div className='rounded-2 border shadow' style={{ padding: "58px" }}>
        <ProductForm onSubmit={handleSubmitProduct} />
      </div>
    </div>
  )
}

export default InputProduct
