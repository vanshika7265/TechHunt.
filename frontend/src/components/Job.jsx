import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "-";
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const diff = currentTime - createdAt;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div
      className="p-5 rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-xl hover:scale-105 transition transform"
      whileHover={{ scale: 1.03 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-2 mb-3">
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name || "Unknown Company"}</h1>
          <p className="text-sm text-gray-500">{job?.location || 'India'}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg mb-2">{job?.title || "Untitled Job"}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description || "No description available."}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position || "-" } Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType || "-"}</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary ? `${job.salary} LPA` : "-"}</Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
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
