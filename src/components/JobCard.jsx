import {
  CalendarIcon,
  LinkIcon,
  LocationMarkerIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const JobUrl = ({ url }) => {
  return (
    <a href={url} target="_blank">
      <button
        type="button"
        className="inline-flex my-2 items-center bg-white mx-1 px-4 py-2 border border-primary ease-in duration-100 hover:bg-gray-100 rounded-md shadow-sm text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <LinkIcon
          className="-ml-1 mr-2 h-5 w-5 text-primary"
          aria-hidden="true"
        />
        View
      </button>
    </a>
  );
};

export default function JobCard({
  url,
  postedOn,
  location,
  title,
  company,
  companyUrl,
}) {
  return (
    <>
      <div data-testid="jobcard" className="flex flex-wrap -m-4 ">
        <div className="w-full mb-4 ">
          <div className="border border-gray-200 p-4 rounded-lg bg-white mb-2 mx-4">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-7 text-[#003f7f] text-left sm:truncate">
                  {title}
                </h2>
                <div className="mt-1 flex flex-col  sm:mt-0">
                  <div className="mt-2 flex items-center text-sm text-gray-500 mr-4">
                    <LocationMarkerIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                    {location}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 mr-4">
                    <a
                      className="cursor-pointer hover:text-[#003f7f] hover:font-semibold flex justify-start"
                      href={companyUrl}
                    >
                      <UserGroupIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary text-left"
                        aria-hidden="true"
                      />
                      Posted By {company}
                    </a>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 mr-4">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                    Posted {postedOn}
                  </div>
                </div>
              </div>
              <div className="mt-5 lg:w-3/5 flex flex-wrap lg:justify-end lg:mt-0 lg:ml-4">
                <JobUrl url={url} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
