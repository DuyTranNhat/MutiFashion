import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import CustomerLayout from '../CustomerLayout/CustomerLayout'
import Home from '../Home/Home'

const Router = createBrowserRouter([
    {
        path: "",
        element: <CustomerLayout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
        ]
    }
])

export default Router
