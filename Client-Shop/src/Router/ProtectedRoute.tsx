import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/UseAuth';

type Props = {
    children: React.ReactNode

};
const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    console.log(location);
    const { isLoggedIn } = useAuth()
    return isLoggedIn() ? (
        <>{children}</>
    ) : <Navigate to="/login" state={{ from : location }} replace ></Navigate>
}
export default ProtectedRoute