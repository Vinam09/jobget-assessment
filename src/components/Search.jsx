import React, { useEffect, useState } from 'react';
import { Filters } from '../utils/Filters';
import FilterComponent from './FilterComponent';
import axios from 'axios';
import JobView from './JobView';
import Pagination from './Pagination';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [radius, setRadius] = useState(25);
  const [datePosted, setDatePosted] = useState(30);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  let fetchPage = 1;

  // FILTERS
  const radiusFilter = document.getElementById('radius');
  const dateFilter = document.getElementById('datePosted');

  // Pagination functions
  function increment() {
    if (currentPage < totalJobs / 10 - 1) setCurrentPage(currentPage + 1);
  }
  function decrement() {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  // Filter Selection
  const handleSelection = () => {
    const radiusSelection =
      radiusFilter.options[radiusFilter.selectedIndex].value;
    const dateSelection = dateFilter.options[dateFilter.selectedIndex].value;

    // Check Radius Filter
    if (radiusSelection === '25 miles' && radius !== 25) {
      setRadius(25);
    } else if (radiusSelection === '50 miles' && radius !== 50) {
      setRadius(50);
    } else if (radiusSelection === '100 miles' && radius !== 100) {
      setRadius(100);
    }

    // Check Date Filter
    if (dateSelection === 'Last month' && radius !== 30) {
      setDatePosted(30);
    } else if (dateSelection === 'Last 14 days' && radius !== 14) {
      setDatePosted(14);
    } else if (dateSelection === 'Last 7 days' && radius !== 7) {
      setDatePosted(7);
    }
  };

  // Fetch Data
  // Fetch 100 jobs at a time
  const fetchJobs = async () => {
    try {
      await axios
        .get('https://api.ziprecruiter.com/jobs/v1', {
          params: {
            search: keyword,
            location: city,
            radius_miles: radius,
            days_ago: datePosted,
            api_key: process.env.REACT_APP_API_KEY,
            page: fetchPage,
            jobs_per_page: 100,
          },
        })
        .then((response) => {
          setTotalJobs(response.data.total_jobs);
          setJobs(response.data.jobs);
        });
    } catch {
      setError(error);
    }
  };

  // Fetch 100 jobs at a time fetch more and concat if needed.
  const fetchMoreJobs = async () => {
    try {
      await axios
        .get('https://api.ziprecruiter.com/jobs/v1', {
          params: {
            search: keyword,
            location: city,
            radius_miles: radius,
            days_ago: datePosted,
            api_key: 'mthpyw9ea7zyswfuj3zur6bt55fce7qf',
            page: fetchPage,
            jobs_per_page: 100,
          },
        })
        .then((response) => {
          setTotalJobs(response.data.total_jobs);
          setJobs(jobs.concat(response.data.jobs));
        });
    } catch {
      setError(error);
    }
  };

  const [firstRender, setFirstRender] = useState(true);
  const [queryCheck, setQueryCheck] = useState(false);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (keyword === '' && city === '') {
      alert('Please provide a valid search term.');
      return;
    }

    fetchJobs();
  };

  // Re render on filters change
  // Don't render anything on initial mount

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    fetchJobs();
    setCurrentPage(0);
  }, [radius, datePosted]);

  useEffect(() => {
    // Check if there is a need to fetch more jobs
    if (((currentPage + 1) * 10) % jobs.length === 0) {
      fetchPage += 1;
      fetchMoreJobs();
      console.log(jobs.length);
    }
  }, [currentPage]);

  return (
    <>
      {/* Search Component */}
      <section className="text-gray-400 bg-white body-font border-b border-gray-200">
        <div className="container px-5 pt-6 pb-4 mx-auto">
          <form onSubmit={handleSearchSubmit}>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
              <div className="relative sm:mb-0 flex-grow w-full">
                <label
                  htmlFor="keyword"
                  className="leading-7 text-sm font-bold text-[#003f7f]"
                >
                  What?
                </label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Keywords"
                  type="text"
                  id="keywords"
                  name="keywords"
                  className="w-full bg-white bg-opacity-40 rounded-md border border-gray-300  focus:ring-2 focus:ring-[#003f7f] focus:bg-transparent text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative sm:mb-0 flex-grow w-full">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm font-bold text-[#003f7f]"
                >
                  Where?
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-white bg-opacity-40 rounded-md border border-gray-300  focus:ring-2 focus:ring-[#003f7f] focus:bg-transparent text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="font-[Poppins] text-white bg-[#003f7f] border-2 border-[#003f7f] py-2 px-4 focus:outline-none hover:bg-gray-100 hover:text-[#003f7f] rounded-md ease-in-out duration-100">
                Search
              </button>
            </div>
            {/* Filters For Job Search */}
            <div
              id="filters"
              className="flex lg:w-2/3 w-full mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4 mt-2"
            >
              {Filters.map((Filter) => {
                return (
                  <FilterComponent
                    key={Filter.id}
                    id={Filter.id}
                    handleSelection={handleSelection}
                    options={Filter.options}
                    filterType={Filter.name}
                  />
                );
              })}
            </div>
          </form>
        </div>
      </section>

      {/* Job View */}
      <JobView jobs={jobs} currentPage={currentPage} />

      {jobs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          maxOpenings={totalJobs}
          increment={increment}
          decrement={decrement}
        />
      )}
    </>
  );
};

export default Search;
