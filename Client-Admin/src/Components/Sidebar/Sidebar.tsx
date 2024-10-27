import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate()

    return (
        <div className="sidebar pointer pe-4 pb-3">
            <nav className="navbar bg-light navbar-light">
                <a href="index.html" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary"><i className="fa fa-hashtag me-2"></i>DASHMIN</h3>
                </a>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img className="rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSADESsnqLTB7q95kJhJXXqRra6IqT3zbBhRA&s" alt="" style={{ width: "40px", height: "40px" }} />
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">Jhon Doe</h6>
                        <span>Admin</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-solid fa-database"></i>Products</a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <a onClick={() => navigate("product")} className="dropdown-item">Product</a>
                            <a onClick={() => navigate("variant")} className="dropdown-item">Variant</a>
                        </div>
                    </div>
                    <a onClick={() => navigate("/supplier")} className="nav-item nav-link"><i className="fa fa-solid fa-truck"></i>Supplier</a>
                    <a onClick={() => navigate("/attribute")} className="nav-item nav-link"><i className="fa fa-th me-2"></i>Attribute</a>
                    <a onClick={() => navigate("/banner")} className="nav-item nav-link"><i className="fa fa-solid fa-chalkboard"></i>Banner</a>
                    <a onClick={() => navigate("/category")} className="nav-item nav-link"><i className="fa fa-table me-2"></i>Category</a>
                    <a href="chart.html" className="nav-item nav-link"><i className="fa fa-chart-bar me-2"></i>Charts</a>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>Pages</a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <a href="signin.html" className="dropdown-item">Sign In</a>
                            <a href="signup.html" className="dropdown-item">Sign Up</a>
                            <a href="404.html" className="dropdown-item">404 Error</a>
                            <a href="blank.html" className="dropdown-item">Blank Page</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
