import { RouterProvider } from 'react-router-dom'
import './App.css'
import Router from './Router/Router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer />
    </>
  )
}

export default App
