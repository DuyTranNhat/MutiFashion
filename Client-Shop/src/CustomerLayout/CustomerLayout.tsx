import { Outlet } from "react-router-dom"
import Topbar from "../Component/Header/Topbar"
import Navbar from "../Component/Header/Navbar"
import Footer from "../Component/Footer/Footer"
import { UserProvider } from "../Context/UseAuth"

const CustomerLayout = () => {

  return (
      <UserProvider>
        <div>
          <Topbar />
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </UserProvider>
  )
}

export default CustomerLayout
