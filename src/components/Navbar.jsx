import React from 'react';

const Navbar = () => {
  return (
    // Navbar
    <header className="bg-[#003f7f] body-font">
      <div className="py-6 container mx-auto flex flex-wrap px-5  flex-row items-center content-center justify-between">
        <a
          href="#"
          className="flex title-font  items-center cursor pointer mb-4 md:mb-0"
        >
          <span className="ml-3 text-3xl font-[Poppins]  text-white">
            JobGet
          </span>
        </a>

        <a
          href=""
          target="_blank"
          className="cursor-pointer inline-flex font-[Poppins] items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base"
        >
          Assignment Code
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
