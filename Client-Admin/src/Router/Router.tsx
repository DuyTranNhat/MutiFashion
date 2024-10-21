import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Supplier from '../pages/Supplier/Supplier';
import InputSupplier from '../pages/Supplier/InputSupplier';
import EditSupplier from '../pages/Supplier/EditSupplier';
import Attribute from '../pages/Attribute/Attribute';
import InputAttribute from '../pages/Attribute/InputAttribute';
import EditAttribute from '../pages/Attribute/EditAttribute';
import InputProduct from '../pages/Product/InputProduct';
import Product from '../pages/Product/Product';
import Variant from '../pages/Variant/Variant';
import VariantDetaills from '../pages/Variant/Details/VariantDetaills';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "variant",
                element: <Variant />
            },
            {
                path: "variants/details/:idVariant",
                element: <VariantDetaills />
            },
            {
                path: "product",
                element: 
                    <Product />
                ,
            },
            {
                path: "product/create",
                element: 
                    <InputProduct />
                ,
            },
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