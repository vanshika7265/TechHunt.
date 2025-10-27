import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs = [] } = useSelector((store) => store.job || {});
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 px-4 md:px-6">
        <h1 className="font-bold text-2xl mb-6">
          {allJobs.length > 0
            ? `Search Results (${allJobs.length})`
            : "No Jobs Found"}
        </h1>

        {allJobs.length === 0 ? (
          <div className="h-[50vh] flex items-center justify-center text-gray-500 text-lg">
            No jobs available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
