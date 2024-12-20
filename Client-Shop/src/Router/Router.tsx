import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import CustomerLayout from '../CustomerLayout/CustomerLayout/CustomerLayout'
import Home from '../Page/Home/Home'
import Shop from '../Page/Shop/Shop'
import VariantDetails from '../Page/VariantDetails/VariantDetails'
import LoginLayout from '../CustomerLayout/LoginLayout'
import Login from '../Page/Login/Login'
import Register from '../Page/Register/Register'
import Cart from '../Page/Cart/Cart'
import Checkout from '../Page/Checkout/Checkout'
import CompletedCheckout from '../Page/Checkout/CompletedCheckout'
import ProtectedRoute from './ProtectedRoute'
import HistoryOrder from '../Page/HistoryOrder/HistoryOrder'

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
            {
                path: "DetailsVariant/:idProduct",
                element: <VariantDetails />
            },
            {
                path: "cart/",
                element:
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
            },
            {
                path: "checkout/",
                element:
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
            },
            {
                path: "checkoutSuccess/:idOrder",
                element: <CompletedCheckout />
            },
            {
                path: "history/",
                element: <ProtectedRoute>
                    <HistoryOrder />
                </ProtectedRoute>
            },
        ]
    },
    {
        path: "",
        element: <LoginLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            }
        ]
    }
])

export default Router
