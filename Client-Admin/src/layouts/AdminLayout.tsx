import React from 'react'
import { Outlet } from "react-router";
import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';
const AdminLayout = () => {
    return (
        <div className="container-fluid position-relative bg-white d-flex p-0">
            <Sidebar />
            <div className="content">
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}
export default AdminLayout