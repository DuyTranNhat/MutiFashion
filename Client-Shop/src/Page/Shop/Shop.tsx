import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductList from '../../Component/Product/ProductList';
import { ProductFilterAPI, ProductGetAPI } from '../../Service/ProductService';
import { ProductGet } from '../../Model/Product'; // Ensure you import the ProductGet type
import CategoryNav from '../../Component/CategoryNav/CategoryNav';
import Pagination from '../../Component/Pagination/Pagination';
import { PageObject } from '../../Model/Common';
import { PAGE_LIMIT_PRODUCT_4, PAGE_LIMIT_PRODUCT_6 } from '../../Utils/constant';
import Search from '../../Component/Search/Search';

export type FilterOption = {
    searchKey: string | undefined;
    selectedValue: number | undefined;
    page: number | undefined;
    limit: number;
    priceAcs: boolean
    priceDes: boolean
}

const Shop = () => {
    const [products, setProducts] = useState<ProductGet[]>([]);
    const [page, setPage] = useState<PageObject>();

    const [filterOption, setFilterOption] = useState<FilterOption>(
        { searchKey: '', selectedValue: -1, page: 1, limit: 3, priceAcs: false, priceDes: false }
    );

    const [filteredProducts, setFilteredProducts] = useState<ProductGet[]>([]);

    useEffect(() => {
        ProductGetAPI(1, 3)
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

            const res = await ProductFilterAPI(filterOption);
            if (res?.data) {
                filteredProducts = res?.data.items;
                setPage(res?.data.page)
            }

            setFilteredProducts(filteredProducts);
        };

        handleSearchProducts();
    }, [JSON.stringify(filterOption), products]);

    const handlePageChange = (pageNumber: number) => {
        setFilterOption(prev => ({ ...prev, page: pageNumber }))
    }

    const handleStopTyping = (key: string) => {
        setFilterOption(prev =>
            ({ ...prev, searchKey: key })
        )
    }

    const handleFilterValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterOption(prev =>
            ({ ...prev, selectedValue: Number(e.target.value) })
        )
    };

    return (
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-3 col-md-4">
                    <CategoryNav handleToggleCheckbox={handleFilterValues} />
                    {/* <AttributeNav handleToggleCheckbox={function (valueId: number, attributeId: number, checked: boolean): void {
                        throw new Error('Function not implemented.');
                    } }  /> */}
                </div>
                <div className="col-lg-9 col-md-8">
                    <div className='row justify-content-center'>
                    </div>
                    <div className='d-flex justify-content-center mb-4' >
                        <Search handleStopTyping={handleStopTyping} />
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-sm btn-light dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                Sorting
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a
                                    className="dropdown-item"
                                    onClick={() => setFilterOption((prev) => ({ ...prev, priceAcs: true, priceDes: false }))}
                                >
                                    Increased Price
                                </a>
                                <a
                                    className="dropdown-item"
                                    onClick={() => setFilterOption((prev) => ({ ...prev, priceAcs: false, priceDes: true }))}
                                >
                                    Decreased Price
                                </a>
                            </div>
                        </div>


                        <div className="btn-group ml-2">
                            <button
                                type="button"
                                className="btn btn-sm btn-light dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                Showing
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a
                                    className="dropdown-item"
                                    onClick={() => setFilterOption((prev) => ({ ...prev, limit: 3 }))}
                                >
                                    3
                                </a>
                                <a
                                    className="dropdown-item"
                                    onClick={() => setFilterOption((prev) => ({ ...prev, limit: 6 }))}
                                >
                                    6
                                </a>
                                <a
                                    className="dropdown-item"
                                    onClick={() => setFilterOption((prev) => ({ ...prev, limit: 9 }))}
                                >
                                    9
                                </a>
                            </div>
                        </div>
                    </div>
                    {filteredProducts && page && filteredProducts.length > 0 ?
                        <>
                            <ProductList
                                col={4}
                                activePage={false}
                                existedProducts={filteredProducts}
                            />
                            <Pagination
                                onPageChange={handlePageChange}
                                pageSize={page?.pageSize!}
                                currentPage={page?.currentPage!}
                                totalItems={page?.totalItems!}
                                totalPages={page?.totalPages!}
                            />
                        </>
                        :
                        <div className='d-flex justify-content-center' >
                            <h2>(No Result)</h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Shop;
