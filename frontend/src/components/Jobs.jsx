import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import { motion } from "framer-motion";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const locationFilter = useSelector((state) => state.job.searchedQuery);
  const companyFilter = useSelector((state) => state.job.companyFilter);
  const jobTypeFilter = useSelector((state) => state.job.jobTypeFilter);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://techhunt-2.onrender.com/api/v1/job/get");
        if (res.data.success) setJobs(res.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let tempJobs = [...jobs];

    if (searchText) {
      tempJobs = tempJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchText.toLowerCase()) ||
          job.description.toLowerCase().includes(searchText.toLowerCase()) ||
          job.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (locationFilter) {
      tempJobs = tempJobs.filter(
        (job) => job.location.toLowerCase() === locationFilter.toLowerCase()
      );
    }

    if (companyFilter) {
      tempJobs = tempJobs.filter(
        (job) => job.company.name.toLowerCase() === companyFilter.toLowerCase()
      );
    }

    if (jobTypeFilter) {
      tempJobs = tempJobs.filter(
        (job) => job.jobType.toLowerCase() === jobTypeFilter.toLowerCase()
      );
    }

    setFilteredJobs(tempJobs);
  }, [jobs, searchText, locationFilter, companyFilter, jobTypeFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 px-4 md:px-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <FilterCard />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border p-2 mt-4 w-full rounded"
          />
        </div>

        <div className="flex-1">
          {filteredJobs.length === 0 ? (
            <div className="h-[70vh] flex items-center justify-center text-gray-500 text-lg">
              No jobs found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <h2 className="font-semibold text-lg">{job.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{job.location}</p>
                  <p className="text-gray-700 mt-2">{job.description}</p>
                  <p className="text-gray-700 mt-1 font-medium">{job.company.name}</p>
                  <span
                    className={`inline-block mt-3 px-2 py-1 rounded-full text-xs font-medium ${
                      job.salary > 50000 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    ₹{job.salary}
                  </span>
                  <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    {job.jobType}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
