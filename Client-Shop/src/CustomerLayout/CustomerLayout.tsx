import { Outlet } from "react-router-dom"
import Topbar from "../Component/Header/Topbar"
import Navbar from "../Component/Header/Navbar"
import Footer from "../Component/Footer/Footer"

const CustomerLayout = () => {

  return (
      <div>
        <Topbar />
        <Navbar /> 
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
  )
}

export default CustomerLayout
