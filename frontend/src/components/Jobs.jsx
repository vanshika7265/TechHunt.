import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs = [] } = useSelector((store) => store.job);

  const [searchText, setSearchText] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  // ✅ Fetch all jobs from backend
  useGetAllJobs();

  // Reset search query when component unmounts
  useEffect(() => {
    return () => dispatch(setSearchedQuery(""));
  }, [dispatch]);

  // ✅ Filter jobs dynamically based on search text
  useEffect(() => {
    const jobsToFilter = allJobs || [];
    if (searchText) {
      const filtered = jobsToFilter.filter(
        (job) =>
          (job.title || "")
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          (job.description || "")
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          (job.company?.name || "")
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          (job.location || "")
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobsToFilter);
    }
  }, [searchText, allJobs]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      {/* Search & Filters Section */}
      <motion.div
        className="max-w-7xl mx-auto mt-8 px-4 md:px-6 flex flex-col md:flex-row gap-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Search Box */}
        <motion.div
          className="w-full md:w-1/4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <input
            type="text"
            placeholder="🔍 Search jobs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 focus:ring-2 focus:ring-[#7209b7] focus:outline-none p-3 mt-4 w-full rounded-lg shadow-sm"
          />
        </motion.div>

        {/* Jobs Grid */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {filteredJobs.length <= 0 ? (
            <div className="h-[70vh] flex items-center justify-center text-gray-500 text-lg font-medium">
              No jobs found 😔
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              transition={{ duration: 0.4 }}
            >
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Jobs;
