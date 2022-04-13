import React, { useState, useEffect } from 'react';
import {
  LocationMarkerIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';

function Pagination({ currentPage, maxOpenings, increment, decrement }) {
  const [maxLimit, setMaxLimit] = useState(currentPage * 10 + 10);
  function setHigh() {
    if (currentPage * 10 + 10 > maxOpenings) {
      setMaxLimit(maxOpenings);
    } else {
      setMaxLimit(currentPage * 10 + 10);
    }
  }
  useEffect(() => {
    setHigh();
  }),
    [currentPage];

  return (
    <>
      <div className="bg-white md:px-16 md:mx-16 px-2 mx-2 mb-8 py-3 flex items-center justify-between border-t border-gray-200 ">
        <div className="flex-1 flex justify-between sm:hidden items-center">
          <a
            onClick={decrement}
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{currentPage * 10 + 1}</span> to{' '}
              <span className="font-medium">{maxLimit}</span> of{' '}
              <span className="font-medium">{maxOpenings}</span> results
            </p>
          </div>
          <a
            onClick={increment}
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">{currentPage * 10 + 1}</span> to{' '}
              <span className="font-medium">{maxLimit}</span> of{' '}
              <span className="font-medium">{maxOpenings}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <a
                onClick={decrement}
                href="#"
                className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                Previous
              </a>

              <a
                onClick={increment}
                href="#"
                className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                Next
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
