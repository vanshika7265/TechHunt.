import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // ✅ Dummy job fallback (in case job prop is missing or incomplete)
  const dummyJob = {
    _id: "dummy1",
    title: "Frontend Developer",
    company: { name: "Google" },
    location: "Hyderabad",
    salary: "12",
    jobType: "Full Time",
    position: "2",
    description:
      "Join Google's frontend engineering team to build scalable, accessible web interfaces using React.js and Tailwind CSS.",
    createdAt: "2025-10-22T08:00:00Z",
  };

  // ✅ Merge provided job with dummy fallback
  const displayJob = { ...dummyJob, ...job };

  // Function to calculate how many days ago it was posted
  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "-";
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const diff = currentTime - createdAt;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? "Today" : `${days} days ago`;
  };

  return (
    <motion.div
      className="p-5 rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-xl hover:scale-105 transition transform"
      whileHover={{ scale: 1.03 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(displayJob?.createdAt)}
        </p>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-2 mb-3">
        <div>
          <h1 className="font-medium text-lg">
            {displayJob?.company?.name || "Unknown Company"}
          </h1>
          <p className="text-sm text-gray-500">
            {displayJob?.location || "India"}
          </p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg mb-2">
          {displayJob?.title || "Untitled Job"}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {displayJob?.description || "No description available."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {displayJob?.position || "-"} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {displayJob?.jobType || "-"}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {displayJob?.salary ? `${displayJob.salary} LPA` : "-"}
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Button
          onClick={() => navigate(`/description/${displayJob?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#5b0e99] text-white">
          Save For Later
        </Button>
      </div>
    </motion.div>
  );
};

export default Job;
