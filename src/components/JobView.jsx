import React from 'react';

import JobCard from './JobCard';

const JobView = ({ jobs, currentPage }) => {
  // Render Job Cards

  function JobCardRender(job) {
    return (
      <JobCard
        key={job.id}
        url={job.url}
        title={job.name}
        postedOn={job.posted_time_friendly}
        location={job.location}
        company={job.hiring_company.name}
        companyUrl={job.hiring_company.url}
      />
    );
  }
  return (
    <>
      <div data className="text-center">
        {jobs.length === 0 ? (
          <div className="min-h-[70vh] pt-16 text-xl font-[Poppins] font-semibold">
            Find your next job here!
          </div>
        ) : (
          <div className="py-12 mx-8 md:mx-32">
            {/* 10 jobs per page */}
            {jobs
              .slice(currentPage * 10, currentPage * 10 + 10)
              .map(JobCardRender)}
          </div>
        )}
      </div>
    </>
  );
};

export default JobView;
