import { Route, RouterProvider } from "react-router-dom"
import Router from './Router/Router'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={Router} />
    </>
  )
}

export default App
