import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import CustomerLayout from '../CustomerLayout/CustomerLayout'
import Home from '../Page/Home/Home'
import Shop from '../Page/Shop/Shop'

const Router = createBrowserRouter([
    {
        path: "",
        element: <CustomerLayout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "Shop",
                element: <Shop />,
            },
        ]
    }
])

export default Router
