import React, { useEffect, useState } from 'react';
import AttributeNav from '../../Component/AttributeNav/AttributeNav';
import { useSearchParams } from 'react-router-dom';
import { attributeGetAPI } from '../../Service/AttributeService';
import { AttributeGet } from '../../Model/Attribute';
import { toast } from 'react-toastify';
import ProductList from '../../Component/Product/ProductList';
import { ProductGetAPI, ProductSearchAPI } from '../../Service/ProductService';
import { ProductGet, ProductSearchPost } from '../../Model/Product'; // Ensure you import the ProductGet type
import CategoryNav from '../../Component/CategoryNav/CategoryNav';
import Pagination from '../../Component/Pagination/Pagination';
import { PageObject } from '../../Model/Common';
import { PAGE_LIMIT_PRODUCT } from '../../Utils/constant';
import Search from '../../Component/Search/Search';

const Shop = () => {
    const [products, setProducts] = useState<ProductGet[]>([]);
    const [page, setPage] = useState<PageObject>();
    const [selectedValues, setSelectedValues] = useState<number[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductGet[]>([]);
    const [searchKey, setSearchKey] = useState<string>("");

    useEffect(() => {
        ProductGetAPI(1, PAGE_LIMIT_PRODUCT)
            .then(res => {
                if (res?.data) {
                    setPage(res?.data.page)
                    setProducts(res?.data.items);
                    setFilteredProducts(res?.data.items);
                }
            }).catch(error => toast.error(error));
    }, []);

    useEffect(() => {
        const handleSearchProducts = async () => {
            let filteredProducts = products;

            if (searchKey) {
                const dataSearch: ProductSearchPost = {
                    key: searchKey,
                };

                const res = await ProductSearchAPI(dataSearch);
                if (res?.data) {
                    filteredProducts = res?.data;
                }
            }

            if (selectedValues.length > 0) {
                filteredProducts = filteredProducts.filter(pro =>
                    selectedValues.every(svalue => svalue === pro.category?.categoryId)
                );
            }

            setFilteredProducts(filteredProducts);
        };

        handleSearchProducts();
    }, [selectedValues, searchKey, products]);

    const handlePageChange = (pageNumber: number) => {
        ProductGetAPI(pageNumber, 1)
            .then(res => {
                if (res?.data) {
                    setPage(res?.data.page)
                    setProducts(res?.data.items)
                    setFilteredProducts(res?.data.items)
                }
            }).catch(error => toast.error(error))
    }

    const handleStopTyping = (key: string) => {
        setSearchKey(key)
    }

    const handleFilterValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValues(prev => {
            if (!e.target.checked) {
                return prev.filter(item => (item !== Number(e.target.value)));
            } else {
                return [...prev, Number(e.target.value)];
            }
        });
    };

    return (
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-3 col-md-4">
                    <CategoryNav handleToggleCheckbox={handleFilterValues} />
                    <AttributeNav handleToggleCheckbox={function (valueId: number, attributeId: number, checked: boolean): void {
                        throw new Error('Function not implemented.');
                    } }  />
                </div>
                <div className="col-lg-9 col-md-8">
                    <div className='row justify-content-center'>
                    </div>
                    <div className='d-flex justify-content-center mb-4' >
                        <Search handleStopTyping={handleStopTyping} />
                    </div>
                    {filteredProducts && page &&
                        <ProductList
                            col={4}
                            existedProducts={filteredProducts}
                        />}
                </div>
                <Pagination
                    onPageChange={handlePageChange}
                    pageSize={page?.pageSize!}
                    currentPage={page?.currentPage!}
                    totalItems={page?.totalItems!}
                    totalPages={page?.totalPages!}
                />
            </div>
        </div>
    );
};

export default Shop;
