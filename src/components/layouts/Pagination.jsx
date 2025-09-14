import React from 'react'
import { LuChevronsRight, LuChevronsLeft } from 'react-icons/lu';

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                className={`px-4 py-2 rounded ${currentPage === 1 ?
                    'bg-gray-300' : 'bg-blue-500 text-white'
                    }`}
                onClick={handlePrevious}
                disabled={currentPage === 1}>
                <LuChevronsLeft />
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 text-xs rounded ${currentPage === page ?
                        'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    onClick={() => setCurrentPage(page)}  >
                    {page}
                </button>
            ))}
            <button
                className={`px-4 py-2 rounded ${currentPage === totalPages ?
                    'bg-gray-300' : 'bg-blue-500 text-white'
                    }`}
                onClick={handleNext}
                disabled={currentPage === totalPages} >
                <LuChevronsRight />
            </button>
        </div>
    );
};

export default Pagination