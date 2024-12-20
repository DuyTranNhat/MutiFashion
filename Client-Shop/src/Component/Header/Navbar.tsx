import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [tabActive, setTabActive] = useState<number>(0)
    const navigate = useNavigate()

    return (
        <div className="container-fluid bg-dark mb-30">
            <div className="row px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: "65px", padding: "0 30px" }}>
                        <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
                        <i className="fa fa-angle-down text-dark"></i>
                    </a>
                    <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: "calc(100% - 30px)", zIndex: "999" }}>
                        <div className="navbar-nav w-100">
                            <div className="nav-item dropdown dropright">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Dresses <i className="fa fa-angle-right float-right mt-1"></i></a>
                                <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                    <a href="" className="dropdown-item">Men's Dresses</a>
                                    <a href="" className="dropdown-item">Women's Dresses</a>
                                    <a href="" className="dropdown-item">Baby's Dresses</a>
                                </div>
                            </div>
                            <a href="" className="nav-item nav-link">Shirts</a>
                            <a href="" className="nav-item nav-link">Jeans</a>
                            <a href="" className="nav-item nav-link">Swimwear</a>
                            <a href="" className="nav-item nav-link">Sleepwear</a>
                            <a href="" className="nav-item nav-link">Sportswear</a>
                            <a href="" className="nav-item nav-link">Jumpsuits</a>
                            <a href="" className="nav-item nav-link">Blazers</a>
                            <a href="" className="nav-item nav-link">Jackets</a>
                            <a href="" className="nav-item nav-link">Shoes</a>
                        </div>
                    </nav>
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                        <a href="" className="text-decoration-none d-block d-lg-none">
                            <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                            <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                        </a>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <a onClick={() => navigate('/')} className="nav-item nav-link">Home</a>
                                <a onClick={() => navigate('/shop')} className="nav-item nav-link">Shop</a>
                                <a onClick={() => navigate('/history')} className="nav-item nav-link">History Order</a>
                            </div>
                            <div className="navbar-nav ml-auto py-0 d-none d-lg-block"
                                onClick={() => navigate('/cart')}
                            >
                                <a className="btn px-0 ml-3">
                                    <i className="fas fa-shopping-cart text-primary"></i>
                                    <span className="badge text-secondary border border-secondary rounded-circle"
                                        style={{ paddingTop: "2px" }}
                                    >
                                        .
                                    </span>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navbar
