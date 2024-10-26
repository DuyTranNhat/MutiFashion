import { Outlet } from "react-router-dom"
import { UserProvider } from "../Context/UseAuth"
import DecoImage from '/img/login.jpg'

const LoginLayout = () => {

    return (
        <UserProvider>
            <div className="authen-wrapper" >
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6 login-section-wrapper">
                                <Outlet />
                            </div>

                            <div className="col-sm-6 px-0 d-none d-sm-block">
                                <img src={DecoImage} alt="login image" className="login-img" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </UserProvider>
    )
}

export default LoginLayout
