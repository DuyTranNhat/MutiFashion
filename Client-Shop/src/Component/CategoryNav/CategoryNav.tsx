import React, { useEffect, useState } from 'react';
import { CategoryGet } from '../../Model/Category';
import { categoryActiveGetAPI } from '../../Service/CategoryService';

export type Props = {
    handleToggleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CategoryNav = ({ handleToggleCheckbox }: Props) => {
    const [categories, setCategories] = useState<CategoryGet[]>([]);

    useEffect(() => {
        categoryActiveGetAPI()
            .then(res => {
                if (res?.data) {
                    setCategories(res.data);
                }
            });
    }, []);

    return (
        categories.length > 0 && (
            <React.Fragment>
                <h5 className="section-title position-relative text-uppercase mb-3">
                    <span className="bg-secondary pr-3">Filter by category</span>
                </h5>
                <div className="bg-light p-4 mb-30">
                    <form>
                        <div
                            className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3"
                        >
                            <input
                                onChange={handleToggleCheckbox}
                                type="radio"
                                className="custom-control-input"
                                value="-1"
                                name="category" // Chỉ định cùng một nhóm radio
                                id="value-all"
                            />
                            <label
                                className="custom-control-label w-100"
                                htmlFor={`value-all`}
                            >
                                All following Options
                            </label>
                        </div>
                        {categories.map((category) => (
                            <div
                                key={category.categoryId}
                                className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3"
                            >
                                <input
                                    onChange={handleToggleCheckbox}
                                    type="radio"
                                    className="custom-control-input"
                                    value={category.categoryId}
                                    name="category" // Chỉ định cùng một nhóm radio
                                    id={`value-${category.categoryId}`}
                                />
                                <label
                                    className="custom-control-label w-100"
                                    htmlFor={`value-${category.categoryId}`}
                                >
                                    <div className="d-flex">
                                        <span>{category.name}</span>
                                        <span className="ml-auto">({category.totalProduct}) total</span>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </form>
                </div>
            </React.Fragment>
        )
    );
};

export default CategoryNav;
