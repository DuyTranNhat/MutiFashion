import { RouterProvider } from 'react-router-dom'
import './App.css'
import Router from './Router/Router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PayPalScript from './Helpers/PaypalScript';

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer />
      <PayPalScript />

    </>
  )
}

export default App
