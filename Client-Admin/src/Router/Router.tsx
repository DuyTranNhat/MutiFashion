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
import Banner from '../pages/Banner/Banner';
import InputBanner from '../pages/Banner/InputBanner';
import EditBanner from '../pages/Banner/EditBanner';
import InputCategory from '../pages/Category/InputCategory';
import Category from '../pages/Category/Category';
import EditCategory from '../pages/Category/EditCategory';
import Order from '../pages/Order/Order';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <Variant />
            },
            {
                path: "banner",
                element: <Banner />
            },
            {
                path: "banner/create",
                element: <InputBanner />
            },
            {
                path: "banner/edit/:id",
                element: <EditBanner />
            },
            {
                path: "category",
                element: <Category />
            },
            {
                path: "category/create",
                element: <InputCategory />
            },
            {
                path: "category/edit/:id",
                element: <EditCategory />
            },
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
            {
                path: "order",
                element: <Order />
            },
        ],
    },
]);
export default Router;