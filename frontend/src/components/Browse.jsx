import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

// ✅ Demo company data fallback
const demoCompanies = [
  {
    _id: "1",
    name: "Google",
    location: "Hyderabad",
    description: "Innovative software solutions for modern businesses",
    status: "Active",
  },
  {
    _id: "2",
    name: "Amazon",
    location: "Bangalore",
    description: "Sustainable tech for a better future",
    status: "Pending",
  },
  {
    _id: "3",
    name: "Forma.AI",
    location: "Pune",
    description: "Financial analytics and AI solutions",
    status: "Closed",
  },
  {
    _id: "4",
    name: "HealthPlus",
    location: "Berlin, Germany",
    description: "Healthcare management software",
    status: "Active",
  },
];

const Browse = () => {
  useGetAllJobs();
  const { allJobs = [] } = useSelector((store) => store.job || {});
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // Determine what to render: jobs or demo companies
  const hasJobs = allJobs.length > 0;
  const itemsToRender = hasJobs ? allJobs : demoCompanies;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 px-4 md:px-6">
        <h1 className="font-bold text-2xl mb-6">
          {hasJobs
            ? `Search Results (${allJobs.length})`
            : "Demo Companies"}
        </h1>

        {itemsToRender.length === 0 ? (
          <div className="h-[50vh] flex items-center justify-center text-gray-500 text-lg">
            No jobs or companies found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {itemsToRender.map((item) =>
              hasJobs ? (
                <Job key={item._id} job={item} />
              ) : (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{item.location}</p>
                  <p className="text-gray-700 mt-2">{item.description}</p>
                  <span
                    className={`inline-block mt-3 px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </motion.div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
