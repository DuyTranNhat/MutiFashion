import React from 'react';

export type PagingProps = {
    pageSize: number;
    totalPages: number;
    totalItems: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PagingProps> = ({ currentPage, pageSize, totalItems, onPageChange, totalPages }) => {
    const calculatedTotalPages = Math.ceil(totalItems / pageSize);
    const displayedTotalPages = totalPages || calculatedTotalPages;

    const pageNumbers = [];
    for (let i = 1; i <= displayedTotalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= displayedTotalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="col-12">
            <div className="mt-3" >
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>
                    </li>

                    {pageNumbers.map((page) => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(page)}>
                                {page}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === displayedTotalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Pagination;
