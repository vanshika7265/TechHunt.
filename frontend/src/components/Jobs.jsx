import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import { motion } from "framer-motion";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");

  // ✅ Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://techhunt-2.onrender.com/api/v1/job/public");
        console.log("Jobs fetched from backend:", res.data); // ✅ Debug
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (err) {
        console.log("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  // ✅ Filter jobs based on search text
  useEffect(() => {
    if (searchText) {
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchText.toLowerCase()) ||
          job.description.toLowerCase().includes(searchText.toLowerCase()) ||
          (job.company?.name || "").toLowerCase().includes(searchText.toLowerCase()) ||
          (job.location || "").toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchText, jobs]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 px-4 md:px-6 flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
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

        {/* Jobs Grid */}
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
                  <p className="text-gray-600 text-sm mt-1">{job.location || "India"}</p>
                  <p className="text-gray-700 mt-2 line-clamp-3">{job.description}</p>
                  <span className="inline-block mt-3 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {job.company?.name || "Unknown Company"}
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
