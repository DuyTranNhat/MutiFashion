import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Supplier from '../pages/Supplier/Supplier';
import InputSupplier from '../pages/Supplier/InputSupplier';
import EditSupplier from '../pages/Supplier/EditSupplier';

const Router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "supplier",
                element: 
                    <Supplier />
                ,
            },
            {
                path: "supplier/create",
                element: <InputSupplier />,
            },
            {
                path: "supplier/edit/:id",
                element: <EditSupplier />,
            },
        ],
    },
]);
export default Router;