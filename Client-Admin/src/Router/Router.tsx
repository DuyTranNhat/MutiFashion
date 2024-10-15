import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Supplier from '../pages/admin/Product';

const Router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "supplier",
                element: <Supplier />,
            },
        ],
    },
]);
export default Router;