import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Supplier from '../pages/Supplier/Supplier';
import InputSupplier from '../pages/Supplier/InputSupplier';
import EditSupplier from '../pages/Supplier/EditSupplier';
import Attribute from '../pages/Attribute/Attribute';
import InputAttribute from '../pages/Attribute/InputAttribute';
import EditAttribute from '../pages/Attribute/EditAttribute';

const Router = createBrowserRouter([
    {
        path: "/",
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
            {
                path: "attribute",
                element: <Attribute />
            },
            {
                path: "attribute/create",
                element: <InputAttribute />
                
            },
            {
                path: "attribute/edit/:id",
                element: <EditAttribute />
                
            },
        ],
    },
]);
export default Router;