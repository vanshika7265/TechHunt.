import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import { motion } from "framer-motion";

// ✅ Mock company data
const demoCompanies = [
  {
    _id: "1",
    name: "Google",
    location: "Hydrabad",
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

const Jobs = () => {
  const [filterCompanies, setFilterCompanies] = useState(demoCompanies);
  const [searchText, setSearchText] = useState("");

  // ✅ Filter companies based on search input
  useEffect(() => {
    if (searchText) {
      const filtered = demoCompanies.filter(
        (company) =>
          company.name.toLowerCase().includes(searchText.toLowerCase()) ||
          company.description.toLowerCase().includes(searchText.toLowerCase()) ||
          company.location.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilterCompanies(filtered);
    } else {
      setFilterCompanies(demoCompanies);
    }
  }, [searchText]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 px-4 md:px-6 flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/4">
          <FilterCard />
          {/* Optional: Add search input */}
          <input
            type="text"
            placeholder="Search companies..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border p-2 mt-4 w-full rounded"
          />
        </div>

        {/* Companies Grid */}
        <div className="flex-1">
          {filterCompanies.length <= 0 ? (
            <div className="h-[70vh] flex items-center justify-center text-gray-500 text-lg">
              No companies found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterCompanies.map((company) => (
                <motion.div
                  key={company._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <h2 className="font-semibold text-lg">{company.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{company.location}</p>
                  <p className="text-gray-700 mt-2">{company.description}</p>
                  <span
                    className={`inline-block mt-3 px-2 py-1 rounded-full text-xs font-medium ${
                      company.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : company.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {company.status}
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
