import React from 'react'
import { useAuth } from '../../Context/UseAuth'
import { useNavigate } from 'react-router-dom'
import DefaultUser from '/img/DefaultUser.png'
import { BASE_URL } from '../../Utils/constant'

const Topbar = () => {
    const { isLoggedIn, user, logout } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="container-fluid">
            <div className="row bg-secondary py-1 px-xl-5">
                <div className="col-lg-6 d-none d-lg-block">
                    <div className="d-inline-flex align-items-center h-100">
                        <a className="text-body mr-3" href="">About</a>
                        <a className="text-body mr-3" href="">Contact</a>
                        <a className="text-body mr-3" href="">Help</a>
                    </div>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                        {isLoggedIn()
                            ? (
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">{user?.name}</button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <button onClick={logout} className="dropdown-item" type="button">Logout</button>
                                        <button onClick={() => navigate("/profile")} className="dropdown-item" type="button">Profile</button>
                                    </div>
                                </div>
                            )
                            : (
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">My Account</button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <button onClick={() => navigate("/login")} className="dropdown-item" type="button">Sign in</button>
                                        <button onClick={() => navigate("/register")} className="dropdown-item" type="button">Sign up</button>
                                    </div>
                                </div>
                            )
                        }

                        <div className="btn-group mx-2">
                            <img src={BASE_URL + "/" + user?.imageUrl || DefaultUser} style={{ height: "36px", width: "36px" }} alt="" />
                        </div>
                    </div>
                    <div className="d-inline-flex align-items-center d-block d-lg-none">
                        <a href="" className="btn px-0 ml-2">
                            <i className="fas fa-heart text-dark"></i>
                            <span className="badge text-dark border border-dark rounded-circle" style={{ padding: "2px" }}>0</span>
                        </a>
                        <a href="" className="btn px-0 ml-2">
                            <i className="fas fa-shopping-cart text-dark"></i>
                            <span className="badge text-dark border border-dark rounded-circle" style={{ padding: "2px" }}>0</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                <div className="col-lg-4">
                    <a href="" className="text-decoration-none">
                        <span className="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
                        <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
                    </a>
                </div>
                <div className="col-lg-4 col-6 text-left">
                </div>
                <div className="col-lg-4 col-6 text-right">
                    <p className="m-0">Customer Service</p>
                    <h5 className="m-0">+012 345 6789</h5>
                </div>
            </div>
        </div>
    )
}

export default Topbar
