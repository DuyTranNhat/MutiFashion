import React from 'react';
import './Paging.scss';

export type PagingProps = {
    pageSize: number;
    totalPages: number;
    totalItems: number;
    currentPage: number;
    onPageChange: (page: number) => void;  
};

const Paging = ({
    totalItems,
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
}: PagingProps) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`pagination__number ${i === currentPage ? 'pagination__number--active' : ''}`}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="my-page">
            <div className="pagination" style={{boxShadow: "none"}}>
                <span className="pagination__number-indicator">
                    Page {currentPage} of {totalPages} (Total Items: {totalItems})
                </span>

                <button
                    className="pagination__arrow"
                    disabled={currentPage === 1}
                    onClick={handlePrevious}
                >
                    <span className="pagination__arrow-half"></span>
                    <span className="pagination__arrow-half"></span>
                </button>

                {renderPageNumbers()}

                <button
                    className="pagination__arrow pagination__arrow--right"
                    disabled={currentPage === totalPages}
                    onClick={handleNext}
                >
                    <span className="pagination__arrow-half"></span>
                    <span className="pagination__arrow-half"></span>
                </button>
            </div>
        </div>
    );
};

export default Paging;
