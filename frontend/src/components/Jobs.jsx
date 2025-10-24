import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
    const dispatch = useDispatch();
    const { allJobs = [] } = useSelector(store => store.job);

    const [searchText, setSearchText] = useState("");
    const [filteredJobs, setFilteredJobs] = useState(allJobs);

    useGetAllJobs();

    // Reset search query on unmount
    useEffect(() => {
        return () => dispatch(setSearchedQuery(""));
    }, [dispatch]);

    // Filter jobs based on search
    useEffect(() => {
        if(searchText) {
            const filtered = allJobs.filter(job =>
                job.title.toLowerCase().includes(searchText.toLowerCase()) ||
                job.description.toLowerCase().includes(searchText.toLowerCase()) ||
                job.company?.name.toLowerCase().includes(searchText.toLowerCase()) ||
                job.location.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [searchText, allJobs]);

    return (
        <div className="min-h-screen flex flex-col bg-blue-50">
            <Navbar />
            <div className="max-w-7xl mx-auto mt-6 px-4 md:px-6 flex flex-col md:flex-row gap-6">
                {/* Filter Sidebar */}
                <div className="w-full md:w-1/4">
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
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
                            {filteredJobs.map(job => <Job key={job._id} job={job} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
