import React from 'react';

const FilterComponent = ({ id, filterType, options, handleSelection }) => {
  return (
    <div className="col-span-6 sm:col-span-3 mr-2">
      <label
        htmlFor={filterType}
        className="block text-sm font-medium text-[#003f7f] "
      >
        {filterType}
      </label>
      <select
        required
        id={id}
        name="category"
        onChange={handleSelection}
        className="mt-1 block w-full py-1 px-2 border border-gray-300 text-gray-900 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#003f7f] focus:border-[#003f7f] sm:text-sm"
      >
        {options.map((option, idx) => {
          return (
            <option key={idx} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterComponent;
