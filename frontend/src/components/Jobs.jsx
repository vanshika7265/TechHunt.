import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice"; // Redux slice
import Job from "./Job"; // Job card component

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector(store => store.job); // Redux store se jobs
  const [searchText, setSearchText] = useState("");

  // ✅ Fetch Active jobs from backend
  const fetchJobs = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get("https://techhunt-2.onrender.com/api/v1/job/get");
      if (res.data.success) {
        // Sirf Active jobs hi store karo
        const activeJobs = res.data.jobs.filter(job => job.status === "Active");
        dispatch(setAllJobs(activeJobs));
      }
    } catch (err) {
      console.log("Error fetching jobs:", err);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  // ✅ Filter jobs based on search input
  const filteredJobs = allJobs.filter(job =>
    job.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchText.toLowerCase()) ||
    job.company?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchText.toLowerCase())
  );

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
          {filteredJobs.length <= 0 ? (
            <div className="h-[70vh] flex items-center justify-center text-gray-500 text-lg">
              No jobs found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
